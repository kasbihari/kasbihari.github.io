import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AdvancedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, strength: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const clock = new THREE.Clock();

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Setup scene ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0A); // zwart

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // performance
    containerRef.current.appendChild(renderer.domElement);

    // --- Geometrie: 2500 deeltjes in een bol met random spreiding ---
    const count = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color(0x2C2C2C), // antraciet
      new THREE.Color(0x5E2A2C), // bordeaux
      new THREE.Color(0xFFFFFF), // wit
    ];

    for (let i = 0; i < count; i++) {
      // Posities in een bol (radius 15-25) – meer variatie dan een perfecte bol
      const r = 15 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);

      // Random kleur uit palet
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i*3] = col.r;
      colors[i*3+1] = col.g;
      colors[i*3+2] = col.b;

      // Willekeurige grootte (voor variatie in vertex shader)
      sizes[i] = 0.8 + Math.random() * 1.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // --- Custom shader materiaal ---
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        mouseStrength: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mouse;
        uniform float mouseStrength;
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Vloeiende, organische beweging gebaseerd op sin/cos van positie en tijd
          float flowX = sin(pos.y * 0.5 + time * 1.5) * cos(pos.z * 0.5 + time * 1.2) * 0.8;
          float flowY = cos(pos.x * 0.6 + time * 1.3) * sin(pos.z * 0.5 + time * 1.1) * 0.8;
          float flowZ = sin(pos.x * 0.5 + time * 1.4) * cos(pos.y * 0.5 + time * 1.0) * 0.8;
          
          vec3 flow = vec3(flowX, flowY, flowZ);
          
          // Mouse repel effect
          vec2 mouseVec = vec2(pos.x, pos.y) - mouse * 20.0; // schaal de muispositie naar wereld-coördinaten
          float dist = length(mouseVec);
          float repelStrength = max(0.0, 1.0 - dist / 8.0) * mouseStrength * 3.0;
          
          // Richting van de muis af (normalized, met een beetje extra chaos)
          if (dist > 0.001) {
            vec2 repelDir = normalize(mouseVec);
            flow.x -= repelDir.x * repelStrength;
            flow.y -= repelDir.y * repelStrength;
            // Z-component ook een beetje beïnvloeden
            flow.z -= sign(pos.z) * repelStrength * 0.5;
          }
          
          vec3 finalPos = pos + flow;
          
          // Projectie
          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.8 + 0.4 * sin(time + pos.x)); // pulseer een beetje
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          // Zachte cirkel met glow
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(gl_PointCoord, center);
          float strength = 1.0 - dist;
          strength = pow(strength, 1.8); // zachtere overgang
          
          // Flikkerend effect
          float flicker = 0.8 + 0.4 * sin(time * 3.0 + gl_PointCoord.x * 10.0);
          
          // Kleur met variabele intensiteit
          vec3 finalColor = vColor * (strength * flicker);
          
          gl_FragColor = vec4(finalColor, strength * 0.5); // transparantie voor glow
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending, // zorgt voor glow
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // --- Mouse interactie ---
    const handleMouseMove = (e: MouseEvent) => {
      // Map muis naar wereldcoördinaten (-1 tot 1) – we gebruiken dit later in de shader
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      mouse.current.x = x;
      mouse.current.y = y;
      mouse.current.strength = 1.0; // wordt in de animatie langzaam opgebouwd/afgezwakt
    };

    const handleMouseLeave = () => {
      mouse.current.strength = 0; // muis weg -> geen repel
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // --- Animatie loop ---
    let animationId: number;
    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = performance.now() / 1000; // seconds

      if (particlesRef.current && material.uniforms) {
        // Update uniforms
        material.uniforms.time.value = elapsedTime;
        
        // Zachte overgang voor mouse strength (in/uit faden)
        const targetStrength = mouse.current.strength;
        material.uniforms.mouseStrength.value += (targetStrength - material.uniforms.mouseStrength.value) * 0.1;
        
        material.uniforms.mouse.value.set(mouse.current.x, mouse.current.y);
        
        // Langzame rotatie voor extra dynamiek
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // --- Resize handler ---
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0" />;
};

export default AdvancedBackground;