varying vec2 vUv;
varying vec3 vPosition;
uniform float time;

void main() {
    vUv = uv;
    vPosition = position;
    vec3 pos = position;
    // subtle movement
    pos.x += sin(time + position.y) * 0.1;
    pos.y += cos(time + position.x) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (300.0 / -mvPosition.z) * 0.5;
}