
#define u_resolution iResolution.xy
#define u_time iTime

#define SDF_MIX 0.1
#define U_SPEED .05
#define MAX_X .35
#define PLUS_X .5
#define SPREAD .15
#define RINGS 64.
#define CIRCLE_RADIUS 1.2

// Ratio function (preserves square aspect ratio)
vec2 ratio(in vec2 v, in vec2 s) {
  return mix(vec2((v.x * s.x / s.y) - (s.x * 0.5 - s.y * 0.5) / s.y, v.y),
             vec2(v.x, v.y * (s.y / s.x) - (s.y * 0.5 - s.x * 0.5) / s.x),
             step(s.x, s.y));
}

// Simplex 3D Noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(in vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  vec3 ns = 0.142857142857 * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Smootherstep
float smootherstep(float edge0, float edge1, float x) {
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

// Circle SDF
float circleSDF(in vec2 v) {
  v -= 0.5;
  return length(v) * 2.0;
}

float circleSDF(in vec2 st, in vec2 center) {
  return circleSDF((st - center) / CIRCLE_RADIUS + 0.5);
}

// Smooth union SDF
float opUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
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
