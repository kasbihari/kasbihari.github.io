import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const FluidAuroraBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, strength: 0 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene / Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    // --- Geometry ---
    const geometry = new THREE.PlaneGeometry(2, 2);

    // --- Uniforms ---
    const uniforms = {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      mouseStrength: { value: 0 },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    // --- Vertex Shader ---
    const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // --- Donkere / Bordeaux / Slate Fragment Shader ---
    const fragmentShader = `
      precision highp float;

      varying vec2 vUv;

      uniform float time;
      uniform vec2 mouse;
      uniform float mouseStrength;
      uniform vec2 resolution;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);

        return mix(
          mix(random(i + vec2(0.0,0.0)), random(i + vec2(1.0,0.0)), u.x),
          mix(random(i + vec2(0.0,1.0)), random(i + vec2(1.0,1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float sum = 0.0;
        float amp = 0.5;

        for(int i = 0; i < 4; i++) {
          sum += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
        }

        return sum;
      }

      void main() {
        vec2 uv = vUv;

        // --- Subtiele mouse interaction ---
        vec2 mouseUV = mouse * 0.5 + 0.5;
        float dist = distance(uv, mouseUV);

        float influence = smoothstep(0.4, 0.0, dist);
        uv += normalize(uv - mouseUV) * influence * mouseStrength * 0.03;

        // --- Langzame beweging ---
        float t = time * 0.15;

        float pattern = fbm(vec2(
          uv.x * 1.2 + t,
          uv.y * 1.6 - t * 0.5
        ));

        pattern = smoothstep(0.2, 0.8, pattern);

        // --- Donkere kleuren: bordeaux, antraciet, slate ---
        vec3 base = vec3(0.08, 0.08, 0.10);   // zeer donker grijs / slate
        vec3 bordeaux = vec3(0.30, 0.12, 0.16); // diep bordeaux (was 0.45,0.18,0.28)
        vec3 slate = vec3(0.12, 0.14, 0.18);    // donker leigrijs

        // Mix op basis van patroon en flow
        vec3 color = mix(base, bordeaux, pattern * 0.4);
        
        float flow = sin(uv.y * 3.0 + t) * 0.5 + 0.5;
        color = mix(color, slate, flow * pattern * 0.3);

        // Zeer subtiele highlight (minimaal)
        float glow = pow(pattern, 2.0) * 0.15;
        color += glow * 0.08;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // --- Mouse Interaction ---
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      mouse.current.x = x;
      mouse.current.y = y;
      mouse.current.strength = 1.0;
    };

    const handleMouseLeave = () => {
      mouse.current.strength = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // --- Animation Loop ---
    let animationId: number;

    const animate = () => {
      const elapsedTime = performance.now() / 1000;

      if (materialRef.current) {
        materialRef.current.uniforms.time.value = elapsedTime;

        materialRef.current.uniforms.mouseStrength.value +=
          (mouse.current.strength -
            materialRef.current.uniforms.mouseStrength.value) *
          0.08;

        materialRef.current.uniforms.mouse.value.set(
          mouse.current.x,
          mouse.current.y
        );
      }

      renderer.render(scene, camera);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // --- Resize ---
    const handleResize = () => {
      if (!rendererRef.current || !materialRef.current) return;

      rendererRef.current.setSize(window.innerWidth, window.innerHeight);

      materialRef.current.uniforms.resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default FluidAuroraBackground;