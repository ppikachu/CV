
#define u_resolution iResolution.xy
#define u_time iTime

#define SDF_MIX 0.2
#define U_SPEED .2
#define MAX_X .3
#define PLUS_X .5
#define PLUS_Y .4
#define SPREAD .31
#define MIN_DIST .02
#define RINGS 128.
#define CIRCLE_RADIUS 2.

#include "/node_modules/lygia/space/ratio.glsl"
#include "/node_modules/lygia/sdf/circleSDF.glsl"
#include "/node_modules/lygia/sdf/opUnion.glsl"

float circleSDF(in vec2 st, in vec2 center) {
  return circleSDF((st - center) / CIRCLE_RADIUS + 0.5);
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
  //init stuff:
  vec2 st = fragCoord.xy/u_resolution.xy;
  vec2 st_b = ratio(st, u_resolution);

  //draw!
  float t = u_time * U_SPEED;
  vec2 center = vec2(PLUS_X, PLUS_Y);

  // Use original cartesian movement
  vec2 poss1 = vec2(PLUS_X - SPREAD, PLUS_Y - SPREAD * 0.4) + vec2(chaoticOffset(t, 0.0), chaoticOffset(t, 1.0)) * MAX_X;
  vec2 poss2 = vec2(PLUS_X + SPREAD, PLUS_Y + SPREAD * 0.4) + vec2(chaoticOffset(t, 2.0), chaoticOffset(t, 3.0)) * MAX_X;
  vec2 poss3 = vec2(PLUS_X, PLUS_Y - SPREAD * 0.6) + vec2(chaoticOffset(t, 4.0), chaoticOffset(t, 5.0)) * MAX_X;

  // Enforce minimum distance from each other
  repelSmooth(poss1, poss2, MIN_DIST);
  repelSmooth(poss2, poss3, MIN_DIST);
  repelSmooth(poss3, poss1, MIN_DIST);

  // Enforce minimum distance from the exact center
  repelFromCenter(poss1, center, MIN_DIST);
  repelFromCenter(poss2, center, MIN_DIST);
  repelFromCenter(poss3, center, MIN_DIST);

  float c = circleSDF(st_b, poss1);
  c = opUnion(c, circleSDF(st_b, poss2), SDF_MIX);
  c = opUnion(c, circleSDF(st_b, poss3), SDF_MIX);
  c = (c<0.5) ? c : 1.0;

  // rings: sharp flat graphic lines
  float ringWave = (cos(RINGS * c) + 1.0) / 2.0;
  float ringLine = (c < 0.5) ? smoothstep(0.48, 0.52, ringWave) : 0.0;

  // Background gradient: fades to pure black at the bottom (st.y = 0.0)
  float verticalFade = smoothstep(0.0, 0.55, st.y);

  // Color palette:
  vec3 bgBlue = vec3(0.0, 0.05, 0.0);       // base background blue
  vec3 lighterBlue = vec3(0.0, 0.2, 0.0);   // lighter blue for the circles

  // Flat color with lighter blue circles
  vec3 flatColor = mix(bgBlue, lighterBlue, ringLine);
  vec3 finalColor = flatColor * verticalFade;

  // output:
  fragColor = vec4(finalColor, 1.0);
}
