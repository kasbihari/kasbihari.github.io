import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AuroraBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, strength: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const clock = new THREE.Clock();

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0A);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Geometrie: 4000 deeltjes voor meer dichtheid ---
    const count = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    // We sturen geen vaste kleuren mee; die bepalen we in de shader op basis van positie en tijd (voor aurora-effect)

    for (let i = 0; i < count; i++) {
      // Plaats deeltjes in een afgeplatte bol/ellipsoïde (meer horizontaal uitgespreid voor aurora-look)
      const r = 20 + Math.random() * 20; // 20-40
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Rek de Y-waarde iets uit voor verticale variatie (aurora's zijn vaak verticaal uitgesmeerd)
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 1.5; // Y uitgerekt
      positions[i*3+2] = r * Math.cos(phi) * 1.2; // Z iets uitgerekt voor diepte

      sizes[i] = 0.8 + Math.random() * 2.0; // meer variatie in grootte
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // --- Custom shader materiaal met aurora-kleuren ---
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
        varying float vDist;
        varying vec3 vPosition;
        
        void main() {
          vec3 pos = position;
          
          // Complexe vloeiende beweging – combinatie van meerdere golven (aurora-flow)
          float flowX = sin(pos.y * 0.4 + time * 1.8) * cos(pos.z * 0.3 + time * 1.2) * 1.2;
          float flowY = cos(pos.x * 0.5 + time * 1.5) * sin(pos.z * 0.4 + time * 1.0) * 1.2;
          float flowZ = sin(pos.x * 0.6 + time * 2.0) * cos(pos.y * 0.4 + time * 1.3) * 1.2;
          
          // Extra golf voor nog meer dynamiek
          flowX += sin(pos.x * 0.8 + time * 2.5) * 0.6;
          flowY += cos(pos.y * 0.7 + time * 2.2) * 0.6;
          flowZ += sin(pos.z * 0.9 + time * 2.8) * 0.6;
          
          vec3 flow = vec3(flowX, flowY, flowZ);
          
          // Mouse repel (verfijnd)
          vec2 mouseVec = vec2(pos.x, pos.y) - mouse * 25.0; // muis in wereldcoördinaten
          float dist = length(mouseVec);
          float repelStrength = max(0.0, 1.0 - dist / 10.0) * mouseStrength * 4.0;
          
          if (dist > 0.001) {
            vec2 repelDir = normalize(mouseVec);
            // Voeg ook een verticale component toe voor een driedimensionaal uitwijken
            flow.x -= repelDir.x * repelStrength;
            flow.y -= repelDir.y * repelStrength * 0.8; // iets minder in Y
            flow.z -= sign(pos.z) * repelStrength * 0.6;
          }
          
          vec3 finalPos = pos + flow;
          vPosition = finalPos; // doorgeven aan fragment shader voor kleur
          vDist = dist; // eventueel voor later gebruik
          
          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_PointSize = size * (350.0 / -mvPosition.z) * (0.9 + 0.3 * sin(time * 3.0 + pos.x));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        
        // Hulpfunctie voor vloeiende mix van kleuren
        vec3 auroraColor(float t) {
          // Kleurenpalet: diep paars (0.0), cyaan (0.3), groen (0.6), roze (1.0)
          vec3 purple = vec3(0.6, 0.2, 0.8); // #9933CC
          vec3 cyan = vec3(0.2, 0.8, 1.0);   // #33CCFF
          vec3 green = vec3(0.3, 0.9, 0.5);  // #4CE680
          vec3 pink = vec3(1.0, 0.4, 0.8);   // #FF66CC
          
          // Eerst mix tussen purple en cyan
          vec3 colorA = mix(purple, cyan, smoothstep(0.0, 0.3, t));
          // Dan tussen cyan en green
          vec3 colorB = mix(cyan, green, smoothstep(0.3, 0.6, t));
          // Dan tussen green en pink
          vec3 colorC = mix(green, pink, smoothstep(0.6, 1.0, t));
          
          // Combineer met naadloze overgangen
          if (t < 0.3) return mix(purple, cyan, t / 0.3);
          else if (t < 0.6) return mix(cyan, green, (t - 0.3) / 0.3);
          else return mix(green, pink, (t - 0.6) / 0.4);
        }
        
        void main() {
          // Zachte cirkel met glow
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(gl_PointCoord, center);
          float strength = 1.0 - dist;
          strength = pow(strength, 1.5);
          
          // Bepaal kleur op basis van Y-positie en tijd voor dynamisch aurora-effect
          float yNorm = (vPosition.y / 30.0) * 0.5 + 0.5; // normalize naar 0-1
          float timeOffset = sin(time * 0.8) * 0.2;
          float t = fract(yNorm + time * 0.2 + timeOffset); // t loopt van 0-1, cyclisch
          
          vec3 color = auroraColor(t);
          
          // Extra flikkering (subtiel)
          float flicker = 0.8 + 0.3 * sin(time * 5.0 + vPosition.x * 2.0);
          
          // Eindkleur met alpha voor glow
          gl_FragColor = vec4(color * flicker, strength * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // --- Mouse interactie (zelfde als voorheen) ---
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // --- Animatie loop ---
    let animationId: number;
    const animate = () => {
      const elapsedTime = performance.now() / 1000;

      if (particlesRef.current && material.uniforms) {
        material.uniforms.time.value = elapsedTime;
        const targetStrength = mouse.current.strength;
        material.uniforms.mouseStrength.value += (targetStrength - material.uniforms.mouseStrength.value) * 0.1;
        material.uniforms.mouse.value.set(mouse.current.x, mouse.current.y);
        
        // Heel langzame rotatie voor extra diepte
        particlesRef.current.rotation.y += 0.0002;
        particlesRef.current.rotation.x += 0.0001;
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

export default AuroraBackground;