#!/usr/bin/env python3
"""
Web Video Pipeline: Generates web-optimized player media, 
silent looping hover thumbnails (WebM/MP4), and poster images.
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
        print("Install via Homebrew (`brew install ffmpeg`) or package manager.", file=sys.stderr)
        sys.exit(1)


def run_command(cmd: list[str], description: str) -> None:
    """Execute a shell command with proper logging and error handling."""
    print(f"  → Generating {description}...")
    result = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        print(f"Error generating {description}:\n{result.stderr}", file=sys.stderr)


def generate_poster(
    input_path: Path,
    poster_out: Path,
    timestamp: str = "00:00:00.500",
    quality: int = 85
) -> None:
    """Generate a WebP poster frame from the video using FFmpeg, with PIL/cwebp fallbacks."""
    print("  → Generating Poster Frame (WebP)...")

    # 1. Try native ffmpeg libwebp encoder
    cmd_ffmpeg = [
        "ffmpeg", "-y", "-ss", timestamp, "-i", str(input_path),
        "-vframes", "1", "-c:v", "libwebp", "-quality", str(quality),
        str(poster_out)
    ]
    result = subprocess.run(cmd_ffmpeg, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if result.returncode == 0:
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
            return

    # If all methods failed, print error
    print(f"Error generating Poster Frame (WebP):\n{result.stderr}", file=sys.stderr)


def process_video(
    input_path: Path,
    output_dir: Path,
    thumb_duration: float | None = None,
    fps: int = 60
) -> None:
    """Encode player versions, hover thumbnails, and poster frames."""
    stem = input_path.stem
    target_dir = output_dir / stem
    target_dir.mkdir(parents=True, exist_ok=True)

    print(f"\nProcessing: {input_path.name} → {target_dir}/")

    # 1. Static Poster (WebP at 0.5s or start)
    poster_out = target_dir / f"{stem}_poster.webp"
    generate_poster(input_path, poster_out)

    # 2. Main Player: MP4 (1080p, H.264, web-optimized faststart)
    player_mp4 = target_dir / f"{stem}_player_1080p.mp4"
    cmd_player_mp4 = [
        "ffmpeg", "-y", "-i", str(input_path),
        "-c:v", "libx264", "-profile:v", "high", "-level", "4.2",
        "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart",
        "-vf", f"scale='min(1920,iw)':-2,fps={fps}",
        "-c:a", "aac", "-b:a", "192k",
        str(player_mp4)
    ]
    run_command(cmd_player_mp4, "Main Player MP4 (1080p H.264)")

    # 3. Main Player: WebM (1080p, VP9)
    player_webm = target_dir / f"{stem}_player_1080p.webm"
    cmd_player_webm = [
        "ffmpeg", "-y", "-i", str(input_path),
        "-c:v", "libvpx-vp9", "-crf", "28", "-b:v", "0",
        "-vf", f"scale='min(1920,iw)':-2,fps={fps}",
        "-c:a", "libopus", "-b:a", "128k",
        str(player_webm)
    ]
    run_command(cmd_player_webm, "Main Player WebM (1080p VP9)")

    # Thumbnail filter settings (silent, scaled down, optional duration trim)
    thumb_duration_args = ["-t", str(thumb_duration)] if thumb_duration else []

    # 4. Hover Thumbnail: MP4 (720p, Silent, H.264)
    thumb_mp4 = target_dir / f"{stem}_thumb_720p.mp4"
    cmd_thumb_mp4 = [
        "ffmpeg", "-y", *thumb_duration_args, "-i", str(input_path),
        "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p",
        "-crf", "23", "-movflags", "+faststart", "-an",
        "-vf", f"scale='min(1280,iw)':-2,fps={fps}",
        str(thumb_mp4)
    ]
    run_command(cmd_thumb_mp4, "Thumbnail MP4 (720p Muted Loop)")

    # 5. Hover Thumbnail: WebM (720p, Silent, VP9)
    thumb_webm = target_dir / f"{stem}_thumb_720p.webm"
    cmd_thumb_webm = [
        "ffmpeg", "-y", *thumb_duration_args, "-i", str(input_path),
        "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0", "-an",
        "-vf", f"scale='min(1280,iw)':-2,fps={fps}",
        str(thumb_webm)
    ]
    run_command(cmd_thumb_webm, "Thumbnail WebM (720p Muted Loop)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Encode high-fps master screen captures for web video players and hover thumbnails."
    )
    parser.add_argument("input", type=Path, help="Input video file or directory containing captures")
    parser.add_argument("-o", "--output", type=Path, default=Path("dist"), help="Output destination folder (default: ./dist)")
    parser.add_argument("-d", "--thumb-duration", type=float, default=5.0, help="Thumbnail loop duration in seconds (default: 5.0)")
    parser.add_argument("--fps", type=int, default=60, help="Target frame rate (default: 60)")

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
            fps=args.fps
        )

    print("\nEncoding complete. Assets ready for deployment.")


if __name__ == "__main__":
    main()