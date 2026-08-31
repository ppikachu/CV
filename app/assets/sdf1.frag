
#define u_resolution iResolution.xy
#define u_time iTime

#define SDF_MIX 0.2
#define U_SPEED .2
#define MAX_X .25
#define PLUS_X .5
#define PLUS_Y .4
#define SPREAD .26
#define MIN_DIST .02
#define RINGS 128.
#define CIRCLE_RADIUS 1.65

#include "/node_modules/lygia/space/ratio.glsl"
#include "/node_modules/lygia/sdf/circleSDF.glsl"
#include "/node_modules/lygia/sdf/opUnion.glsl"

float circleSDF(in vec2 st, in vec2 center, float radius) {
  return circleSDF((st - center) / radius + 0.5);
}

// Pseudo-random chaotic movement using incommensurate frequencies (similar to fBm)
float chaoticOffset(float t, float offset) {
    float v = sin(t + offset) * 0.5;
    v += cos(t * 1.618 + offset * 1.3) * 0.25;
    v += sin(t * 2.618 + offset * 1.69) * 0.125;
    v += cos(t * 4.236 + offset * 2.2) * 0.0625;
    return v * 1.06; 
}

// Smoothly prevents two points from getting closer than minDist without jumping
void repelSmooth(inout vec2 p1, inout vec2 p2, float minDist) {
    if (minDist <= 0.0) return; // If minDist is 0, they can freely converge!
    vec2 diff = p1 - p2;
    float l = length(diff);
    
    // Smooth maximum between actual distance 'l' and 'minDist'
    float k = minDist * 0.5; // smoothness factor
    float h = clamp(0.5 + 0.5 * (l - minDist) / k, 0.0, 1.0);
    float newL = mix(minDist, l, h) + k * h * (1.0 - h);
    
    // Push them apart to newL
    float push = (newL - l) * 0.5;
    vec2 dir = (l < 0.001) ? vec2(1.0, 0.0) : (diff / l);
    p1 += dir * push;
    p2 -= dir * push;
}

void repelFromCenter(inout vec2 p, vec2 center, float minDist) {
    if (minDist <= 0.0) return;
    vec2 diff = p - center;
    float l = length(diff);
    float k = minDist * 0.5;
    float h = clamp(0.5 + 0.5 * (l - minDist) / k, 0.0, 1.0);
    float newL = mix(minDist, l, h) + k * h * (1.0 - h);
    float push = newL - l;
    vec2 dir = (l < 0.001) ? vec2(1.0, 0.0) : (diff / l);
    p += dir * push;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
  // init stuff:
  vec2 st = fragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;

  // Responsive mobile/portrait adaptation (0.0 on desktop >= 1.0, 1.0 on mobile <= 0.45)
  float portraitFactor = clamp((1.0 - aspect) / 0.55, 0.0, 1.0);

  // Coordinate space: preserve 1:1 aspect ratio based on height for consistent circular ripples
  vec2 st_b = vec2((st.x - 0.5) * aspect + 0.5, st.y);

  // On mobile portrait, position center around 0.44 so circular ripples peak naturally below the hero title
  float centerY = mix(PLUS_Y, 0.44, portraitFactor);
  vec2 center = vec2(PLUS_X, centerY);

  // draw!
  float t = u_time * U_SPEED;

  // Compact spread and motion bounds on mobile portrait so rings stay focused and do not bleed into top header
  float spreadX = SPREAD * mix(1.0, 0.40, portraitFactor);
  float spreadY = SPREAD * mix(1.0, 0.30, portraitFactor);
  float maxX = MAX_X * mix(1.0, 0.30, portraitFactor);

  // Use cartesian movement around responsive center
  vec2 poss1 = center + vec2(-spreadX, -spreadY * 0.4) + vec2(chaoticOffset(t, 0.0), chaoticOffset(t, 1.0)) * maxX;
  vec2 poss2 = center + vec2(spreadX, spreadY * 0.4) + vec2(chaoticOffset(t, 2.0), chaoticOffset(t, 3.0)) * maxX;
  vec2 poss3 = center + vec2(0.0, -spreadY * 0.6) + vec2(chaoticOffset(t, 4.0), chaoticOffset(t, 5.0)) * maxX;

  // Enforce minimum distance from each other
  repelSmooth(poss1, poss2, MIN_DIST);
  repelSmooth(poss2, poss3, MIN_DIST);
  repelSmooth(poss3, poss1, MIN_DIST);

  // Enforce minimum distance from the exact center
  repelFromCenter(poss1, center, MIN_DIST);
  repelFromCenter(poss2, center, MIN_DIST);
  repelFromCenter(poss3, center, MIN_DIST);

  // Scale down circle radius slightly on both desktop (1.65) and mobile (0.95)
  float currentRadius = mix(CIRCLE_RADIUS, 0.95, portraitFactor);

  float c = circleSDF(st_b, poss1, currentRadius);
  c = opUnion(c, circleSDF(st_b, poss2, currentRadius), SDF_MIX);
  c = opUnion(c, circleSDF(st_b, poss3, currentRadius), SDF_MIX);
  c = (c < 0.5) ? c : 1.0;

  // rings: sharp flat graphic lines
  float ringCount = mix(RINGS, 130.0, portraitFactor);
  float ringWave = (cos(ringCount * c) + 1.0) / 2.0;
  float ringLine = (c < 0.5) ? smoothstep(0.46, 0.54, ringWave) : 0.0;

  // Bottom gradient: fades to pure black at the bottom (st.y = 0.0)
  float fadeThreshold = mix(0.55, 0.25, portraitFactor);
  float verticalFade = smoothstep(0.0, fadeThreshold, st.y);

  // Top fade: ensure rings smoothly fade to black below 'Santiago Toyos' on mobile
  float topFade = mix(1.0, smoothstep(0.82, 0.68, st.y), portraitFactor);

  // Color palette:
  vec3 bgBlue = vec3(0.0, 0.05, 0.0);       // base background green
  vec3 lighterBlue = vec3(0.0, 0.2, 0.0);   // lighter green for the circles

  // Flat color with lighter circles
  vec3 flatColor = mix(bgBlue, lighterBlue, ringLine);
  vec3 finalColor = flatColor * verticalFade * topFade;

  // output:
  fragColor = vec4(finalColor, 1.0);
}
