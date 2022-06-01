#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform float u_progress;
uniform vec2 u_resolution;
uniform vec3 u_colorBackground;
uniform vec3 u_colorForeground;

varying vec2 v_Uv;

float smoothedge(float v) {
    return smoothstep(0.0, 1.0 / u_resolution.x, v);
}

float ring(vec2 p, float radius, float width) {
  return abs(length(p) - radius * 0.5) - width;
}

float clockWipe(vec2 p, float t) {
    float a = atan(-p.x, -p.y);
    float v = (t * TWO_PI > a + PI) ? 1.0 : 0.0;
    return v;
}

float linearstep(float begin, float end, float t) {
    return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

void main() {

    vec3 color = u_colorBackground;
    float disk = min(1.0, ring(v_Uv - vec2(0.5, 0.5), 0.8, 0.08)) * -1.0;
    float progress = clockWipe(v_Uv - vec2(0.5), linearstep(0.0, 100.0, u_progress));
    color = mix(color, u_colorForeground, progress);

    gl_FragColor = vec4(color, smoothedge(disk));
}
