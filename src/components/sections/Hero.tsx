import React, { useEffect, useRef, useState } from 'react';
import { Zap, Mail, Download, ArrowDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   PERFORMANCE NOTES:
   - No framer-motion above the fold
   - Canvas particle field via rAF, cleaned up on unmount
   - CSS-only glow / radial gradient — no JS
   - Skill chips as static const — no runtime recalc
───────────────────────────────────────────── */

const SKILLS = [
  'React / Next.js', 'TypeScript', 'HTML / CSS', 'Tailwind',
  'Node.js', 'PHP / Symfony', 'Python', 'SQL / Prisma',
  'Figma / Adobe', 'Unity / C#', 'WordPress / Bubble',
];

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  /* Subtle particle field — rAF + canvas, no library */
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.35 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,42,44,${p.a})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const navigate = (section: string) =>
    window.dispatchEvent(new CustomEvent('navigate', { detail: { section } }));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden">

      {/* ── Particle canvas — background atmosphere ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.7 }}
      />

      {/* ── CSS radial glow — zero JS cost ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 65%, rgba(94,42,44,0.13) 0%, transparent 70%)',
        }}
      />

      {/* ══════════════════════════════════════
          HERO CONTENT — staggered fade-in via CSS
      ══════════════════════════════════════ */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
        style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}
      > <br />

        {/* ── Availability pill ── */}
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2.5 mb-12">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-white/55 text-xs tracking-[0.25em] uppercase font-mono">
            Open for freelance & collaboration
          </span>
        </div> <br /> <br />

        {/* ── Name — two-line cinematic scale ── */}
        <h1
          className="font-name leading-none mb-5 select-none"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
            textShadow:
              '0 0 40px rgba(94,42,44,0.55), 0 0 80px rgba(94,42,44,0.18)',
            letterSpacing: '-0.02em',
          }}
        >
          <span className="text-white">Krishna Bihari</span>
          <br /> <br />
          {/* <span className="text-white/35">Bihari</span> */}
        </h1>

        {/* ── Role tag — mono, spaced ── */}
        <p className="text-bordeaux/65 tracking-[0.25em] uppercase text-sm font-mono mb-8">
          Creative Developer · Systems Architect
        </p>

        {/* ── Hero statement ── */}
        <p className="font-body text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed mb-12">
          I build digital experiences where{' '}
          <span className="text-white font-medium">performance</span> meets{' '}
          <span className="text-white font-medium">visual poetry</span> with a
          cultural signature that sets them apart.
        </p>

        {/* ── CTA cluster ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-16 w-full sm:w-auto">
          <button
            onClick={() => navigate('projects')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-bordeaux hover:bg-bordeaux/80 text-white rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-[0_0_28px_rgba(94,42,44,0.5)]"
          >
            <Zap size={16} />
            View Projects
          </button>
          <button
            onClick={() => navigate('contact')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 glass text-white/75 hover:text-white rounded-lg font-medium text-sm transition-all duration-200 hover:border-bordeaux/50"
          >
            <Mail size={16} />
            Let's build together
          </button>
          <button
            onClick={() => window.open('/CV-Krishna.pdf', '_blank')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 glass text-white/50 hover:text-white/80 rounded-lg font-medium text-sm transition-all duration-200"
            aria-label="Download CV"
          >
            <Download size={16} />
            Download CV
          </button>
        </div>

        {/* ── Stack chips — grouped visually by spacing ── */}
        <div className="w-full max-w-2xl">
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-mono mb-4">
            Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 text-xs rounded-full glass text-white/50 hover:text-white/85 hover:border-bordeaux/35 transition-colors duration-200 cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div> <br /><br /><br /><br />

      {/* ── Scroll cue — bottom center ── */}
      <button
        onClick={() => navigate('about')}
        aria-label="Continue to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 hover:text-bordeaux/50 transition-colors duration-300"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-mono">Scroll</span>
        <ArrowDown size={13} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;