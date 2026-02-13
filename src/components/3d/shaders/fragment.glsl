varying vec2 vUv;
uniform float time;
uniform vec3 color;
uniform float glowIntensity;

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(gl_PointCoord, center);
    float strength = 1.0 - dist;
    strength = pow(strength, 1.5);
    gl_FragColor = vec4(color, strength * 0.2); // very subtle
}