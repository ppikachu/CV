#!/usr/bin/env python3
"""
================================================================================
Web Video Encoding Pipeline
================================================================================

Generates web-optimized video assets from high-resolution/high-fps master screen
recordings or video captures.

For each input video, this pipeline generates:
  1. Static Poster Frame   (.webp) - Clean preview image captured at 0.5s.
  2. Full Player MP4       (.mp4)  - Up to 1080p, H.264 (High profile), AAC audio, +faststart.
  3. Full Player WebM      (.webm) - Up to 1080p, VP9 (CRF 28), Opus audio.
  4. Hover Thumbnail MP4   (.mp4)  - Up to 720p, silent, H.264, trimmed loop (+faststart).
  5. Hover Thumbnail WebM  (.webm) - Up to 720p, silent, VP9 (CRF 32), trimmed loop.

--------------------------------------------------------------------------------
Prerequisites
--------------------------------------------------------------------------------
1. FFmpeg (Required):
   - macOS:   brew install ffmpeg
   - Ubuntu:  sudo apt update && sudo apt install -y ffmpeg
   - Windows: winget install Gyan.FFmpeg / choco install ffmpeg

2. WebP tools / Pillow (Optional fallbacks for poster generation):
   - macOS:   brew install webp
   - Python:  pip install pillow

--------------------------------------------------------------------------------
Usage Examples
--------------------------------------------------------------------------------
1. Single video processing (default output to public/videos/):
   python3 scripts/encode_videos.py captures/demo.mov -o public/videos

2. Fast MP4-only encoding (skipping WebM):
   python3 scripts/encode_videos.py captures/demo.mov -o public/videos --skip-webm

3. Batch process an entire directory:
   python3 scripts/encode_videos.py captures/ -o public/videos

4. Custom thumbnail loop duration (3.5s) and frame rate cap (30 fps):
   python3 scripts/encode_videos.py demo.mov -o public/videos -d 3.5 --fps 30

--------------------------------------------------------------------------------
HTML5 / Nuxt / Vue Integration Guide
--------------------------------------------------------------------------------
Main Video Player:
  <video
    poster="/videos/demo/demo_poster.webp"
    controls
    preload="metadata"
    playsinline
    class="w-full rounded-lg"
  >
    <source src="/videos/demo/demo_player_1080p.webm" type="video/webm" />
    <source src="/videos/demo/demo_player_1080p.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

Silent Looping Hover / Card Preview:
  <video
    autoplay
    loop
    muted
    playsinline
    poster="/videos/demo/demo_poster.webp"
    class="w-full h-full object-cover"
  >
    <source src="/videos/demo/demo_thumb_720p.webm" type="video/webm" />
    <source src="/videos/demo/demo_thumb_720p.mp4" type="video/mp4" />
  </video>
================================================================================
"""

import argparse
import subprocess
import sys
from pathlib import Path
import shutil


def check_ffmpeg() -> None:
    """Verify that FFmpeg is installed and accessible in the system PATH."""
    if not shutil.which("ffmpeg"):
        print("Error: FFmpeg is not installed or not found in PATH.", file=sys.stderr)
        print("Install via Homebrew (`brew install ffmpeg`) or your system package manager.", file=sys.stderr)
        sys.exit(1)


def get_video_duration(input_path: Path) -> float | None:
    """Extract video duration in seconds using ffprobe."""
    try:
        cmd = [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(input_path)
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return float(res.stdout.strip())
    except Exception:
        return None


def run_command(cmd: list[str], description: str, total_duration: float | None = None) -> None:
    """Execute an FFmpeg command with live progress tracking and proper error handling."""
    full_cmd = list(cmd) + ["-progress", "pipe:1", "-nostats"]

    process = subprocess.Popen(
        full_cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1,
        universal_newlines=True
    )

    last_pct = -1
    speed_str = ""

    if process.stdout:
        for line in process.stdout:
            line = line.strip()
            if not line:
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                if key == "speed":
                    speed_str = val.strip()
                elif key == "out_time_us" and total_duration and total_duration > 0:
                    try:
                        us = int(val)
                        current_sec = us / 1_000_000.0
                        pct = min(100, int((current_sec / total_duration) * 100))
                        if pct != last_pct and pct >= 0:
                            last_pct = pct
                            speed_disp = f" @ {speed_str}" if speed_str and speed_str != "N/A" else ""
                            print(f"\r  → [{pct:3d}%]{speed_disp} {description}...", end="", flush=True)
                    except ValueError:
                        pass

    _, stderr = process.communicate()
    if process.returncode != 0:
        print(f"\r  ✗ Error generating {description}:\n{stderr}", file=sys.stderr)
    else:
        print(f"\r  ✓ {description} complete!{' ' * 24}")


def generate_poster(
    input_path: Path,
    poster_out: Path,
    timestamp: str = "00:00:00.500",
    quality: int = 85
) -> None:
    """Generate a WebP poster frame from the video using FFmpeg, with PIL/cwebp fallbacks."""
    print("  → Generating Poster Frame (WebP)...", end="", flush=True)

    # 1. Try native ffmpeg libwebp encoder
    cmd_ffmpeg = [
        "ffmpeg", "-y", "-ss", timestamp, "-i", str(input_path),
        "-vframes", "1", "-c:v", "libwebp", "-quality", str(quality),
        str(poster_out)
    ]
    result = subprocess.run(cmd_ffmpeg, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if result.returncode == 0:
        print(f"\r  ✓ Poster Frame (WebP) complete!{' ' * 24}")
        return

    # 2. Fallback: Extract single PNG frame from ffmpeg and convert using Pillow (PIL)
    cmd_png = [
        "ffmpeg", "-y", "-ss", timestamp, "-i", str(input_path),
        "-vframes", "1", "-f", "image2pipe", "-vcodec", "png", "pipe:1"
    ]
    png_res = subprocess.run(cmd_png, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    if png_res.returncode == 0 and png_res.stdout:
        try:
            import io
            from PIL import Image  # type: ignore
            img = Image.open(io.BytesIO(png_res.stdout))
            img.save(poster_out, format="WEBP", quality=quality)
            print(f"\r  ✓ Poster Frame (WebP - Pillow) complete!{' ' * 24}")
            return
        except ImportError:
            pass
        except Exception as e:
            print(f"  Warning: Pillow conversion failed ({e}), trying cwebp...", file=sys.stderr)

    # 3. Fallback: Pipe PNG into cwebp if available
    if shutil.which("cwebp"):
        p1 = subprocess.Popen(cmd_png, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        p2 = subprocess.run(
            ["cwebp", "-quiet", "-q", str(quality), "-o", str(poster_out), "--", "-"],
            stdin=p1.stdout,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE
        )
        if p1.stdout:
            p1.stdout.close()
        p1.wait()
        if p2.returncode == 0:
            print(f"\r  ✓ Poster Frame (WebP - cwebp) complete!{' ' * 24}")
            return

    # If all methods failed, print error
    print(f"\r  ✗ Error generating Poster Frame (WebP):\n{result.stderr}", file=sys.stderr)


def process_video(
    input_path: Path,
    output_dir: Path,
    thumb_duration: float | None = 5.0,
    fps: int | None = None,
    skip_webm: bool = False,
    skip_player: bool = False,
    skip_thumbs: bool = False,
    speed: str = "fast"
) -> None:
    """Encode player versions, hover thumbnails, and poster frames for a single video file."""
    stem = input_path.stem
    target_dir = output_dir / stem
    target_dir.mkdir(parents=True, exist_ok=True)

    print(f"\nProcessing: {input_path.name} → {target_dir}/")

    duration = get_video_duration(input_path)

    # Configure speed / threading presets
    if speed == "fast":
        x264_preset = "veryfast"
        vp9_deadline = "realtime"
        vp9_cpu_used = "6"
    elif speed == "quality":
        x264_preset = "medium"
        vp9_deadline = "good"
        vp9_cpu_used = "2"
    else:  # balanced
        x264_preset = "fast"
        vp9_deadline = "realtime"
        vp9_cpu_used = "4"

    # Scale filter configurations
    fps_filter = f",fps={fps}" if fps else ""
    player_vf = f"scale='min(1920,iw)':-2{fps_filter}"
    thumb_vf = f"scale='min(1280,iw)':-2{fps_filter}"

    # 1. Static Poster (WebP at 0.5s or start)
    poster_out = target_dir / f"{stem}_poster.webp"
    generate_poster(input_path, poster_out)

    # 2. Main Player: MP4 (1080p, H.264, web-optimized faststart)
    if not skip_player:
        player_mp4 = target_dir / f"{stem}_player_1080p.mp4"
        cmd_player_mp4 = [
            "ffmpeg", "-y", "-i", str(input_path),
            "-c:v", "libx264", "-preset", x264_preset, "-profile:v", "high", "-level", "4.2",
            "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart",
            "-vf", player_vf,
            "-c:a", "aac", "-b:a", "192k",
            str(player_mp4)
        ]
        run_command(cmd_player_mp4, "Main Player MP4 (1080p H.264)", total_duration=duration)

        # 3. Main Player: WebM (1080p, VP9)
        if not skip_webm:
            player_webm = target_dir / f"{stem}_player_1080p.webm"
            cmd_player_webm = [
                "ffmpeg", "-y", "-i", str(input_path),
                "-c:v", "libvpx-vp9", "-deadline", vp9_deadline, "-cpu-used", vp9_cpu_used,
                "-row-mt", "1", "-threads", "0", "-crf", "30", "-b:v", "0",
                "-vf", player_vf,
                "-c:a", "libopus", "-b:a", "128k",
                str(player_webm)
            ]
            run_command(cmd_player_webm, "Main Player WebM (1080p VP9)", total_duration=duration)

    # Thumbnail processing
    if not skip_thumbs:
        thumb_duration_args = ["-t", str(thumb_duration)] if thumb_duration else []
        thumb_effective_duration = min(duration, thumb_duration) if (duration and thumb_duration) else (thumb_duration or duration)

        # 4. Hover Thumbnail: MP4 (720p, Silent, H.264)
        thumb_mp4 = target_dir / f"{stem}_thumb_720p.mp4"
        cmd_thumb_mp4 = [
            "ffmpeg", "-y", *thumb_duration_args, "-i", str(input_path),
            "-c:v", "libx264", "-preset", x264_preset, "-profile:v", "main", "-pix_fmt", "yuv420p",
            "-crf", "23", "-movflags", "+faststart", "-an",
            "-vf", thumb_vf,
            str(thumb_mp4)
        ]
        run_command(cmd_thumb_mp4, "Thumbnail MP4 (720p Muted Loop)", total_duration=thumb_effective_duration)

        # 5. Hover Thumbnail: WebM (720p, Silent, VP9)
        if not skip_webm:
            thumb_webm = target_dir / f"{stem}_thumb_720p.webm"
            cmd_thumb_webm = [
                "ffmpeg", "-y", *thumb_duration_args, "-i", str(input_path),
                "-c:v", "libvpx-vp9", "-deadline", vp9_deadline, "-cpu-used", vp9_cpu_used,
                "-row-mt", "1", "-threads", "0", "-crf", "32", "-b:v", "0", "-an",
                "-vf", thumb_vf,
                str(thumb_webm)
            ]
            run_command(cmd_thumb_webm, "Thumbnail WebM (720p Muted Loop)", total_duration=thumb_effective_duration)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Encode master screen captures and videos for web players, hover thumbnails, and poster frames.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Encode a video with live progress into public/videos/:
  python3 scripts/encode_videos.py captures/demo.mov -o public/videos

  # Ultra-fast encoding (MP4 + poster only, skip WebM):
  python3 scripts/encode_videos.py captures/demo.mov -o public/videos --skip-webm

  # Batch process all recordings in captures/:
  python3 scripts/encode_videos.py captures/ -o public/videos

  # Only generate 4-second hover thumbnails:
  python3 scripts/encode_videos.py captures/ -o public/videos --skip-player -d 4.0

Output per video ('<output_dir>/<stem>/'):
  • <stem>_poster.webp       : Static WebP frame (at 0.5s)
  • <stem>_player_1080p.mp4  : 1080p H.264 web player video (+faststart)
  • <stem>_player_1080p.webm : 1080p VP9 web player video
  • <stem>_thumb_720p.mp4    : 720p H.264 silent looping thumbnail
  • <stem>_thumb_720p.webm   : 720p VP9 silent looping thumbnail
"""
    )
    parser.add_argument("input", type=Path, help="Input video file (.mov, .mp4, .mkv, .webm) or directory containing video captures")
    parser.add_argument("-o", "--output", type=Path, default=Path("dist"), help="Output destination folder (default: ./dist)")
    parser.add_argument("-d", "--thumb-duration", type=float, default=5.0, help="Thumbnail loop duration in seconds (default: 5.0)")
    parser.add_argument("--fps", type=int, default=None, help="Max frame rate cap (default: keep source frame rate)")
    parser.add_argument("--speed", choices=["fast", "balanced", "quality"], default="fast", help="Encoding speed preset (default: fast)")
    parser.add_argument("--skip-webm", action="store_true", help="Skip generating WebM VP9 files (fastest)")
    parser.add_argument("--skip-player", action="store_true", help="Skip full 1080p player media (only generate thumbnails & poster)")
    parser.add_argument("--skip-thumbs", action="store_true", help="Skip hover thumbnails (only generate full player & poster)")

    args = parser.parse_args()
    check_ffmpeg()

    valid_extensions = {".mov", ".mp4", ".mkv", ".avi", ".webm"}

    if args.input.is_file():
        files = [args.input]
    elif args.input.is_dir():
        files = [f for f in args.input.iterdir() if f.suffix.lower() in valid_extensions]
        if not files:
            print(f"No video files found in {args.input}", file=sys.stderr)
            sys.exit(1)
    else:
        print(f"Error: {args.input} does not exist.", file=sys.stderr)
        sys.exit(1)

    for file in files:
        process_video(
            input_path=file,
            output_dir=args.output,
            thumb_duration=args.thumb_duration,
            fps=args.fps,
            skip_webm=args.skip_webm,
            skip_player=args.skip_player,
            skip_thumbs=args.skip_thumbs,
            speed=args.speed
        )

    print("\nEncoding complete. Assets ready for deployment.")


if __name__ == "__main__":
    main()