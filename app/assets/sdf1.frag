
#define u_resolution iResolution.xy
#define u_time iTime

#define SDF_MIX 0.1
#define U_SPEED .05
#define MAX_X .35
#define PLUS_X .5
#define SPREAD .15
#define RINGS 64.
#define CIRCLE_RADIUS 1.2

#include "/node_modules/lygia/space/ratio.glsl"
#include "/node_modules/lygia/generative/snoise.glsl"
#include "/node_modules/lygia/math/smootherstep.glsl"
#include "/node_modules/lygia/sdf/circleSDF.glsl"
#include "/node_modules/lygia/sdf/opUnion.glsl"

float circleSDF(in vec2 st, in vec2 center) {
  return circleSDF((st - center) / CIRCLE_RADIUS + 0.5);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
  //init stuff:
  vec2 st = fragCoord.xy/u_resolution.xy;
  vec2 st_b = ratio(st, u_resolution);

  //draw!
  vec2 poss1 = vec2(PLUS_X - SPREAD, PLUS_X - SPREAD * 0.4) + vec2(snoise(vec3(.00,.5,u_time*U_SPEED)), snoise(vec3(.5,1.,u_time*U_SPEED))) * MAX_X;
  vec2 poss2 = vec2(PLUS_X + SPREAD, PLUS_X + SPREAD * 0.4) + vec2(snoise(vec3(.50,.5,u_time*U_SPEED)), snoise(vec3(.5,.5,u_time*U_SPEED))) * MAX_X;
  vec2 poss3 = vec2(PLUS_X, PLUS_X - SPREAD * 0.6) + vec2(snoise(vec3(.75,.5,u_time*U_SPEED)), snoise(vec3(.5,.0,u_time*U_SPEED))) * MAX_X;

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
  vec3 bgBlue = vec3(0.1, 0.2, 0.45);       // base background blue
  vec3 lighterBlue = vec3(0.1, 0.25, 0.55);   // lighter blue for the circles

  // Flat color with lighter blue circles
  vec3 flatColor = mix(bgBlue, lighterBlue, ringLine);
  vec3 finalColor = flatColor * verticalFade;

  // output:
  fragColor = vec4(finalColor, 1.0);
}
