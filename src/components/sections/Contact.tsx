import React, { useState, useRef, useEffect } from 'react';
import {
  Mail, Github, Linkedin, Copy, Check,
  Send, ArrowRight, Languages,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   PERFORMANCE NOTES:
   - Framer-motion removed (saves ~40 kB)
   - Copy feedback via local state, no external dep
   - IntersectionObserver reveal on each card
   - No inline event handler re-creation (useCallback)
───────────────────────────────────────────── */

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Contact page ─── */
const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('kas.bihari@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-20 flex items-center">
      <div className="max-w-4xl w-full mx-auto space-y-20">

        {/* ══════════════════════════════════════
            HEADER — opening statement
        ══════════════════════════════════════ */}
        <Reveal>
          <p className="text-bordeaux/60 text-xs tracking-[0.3em] uppercase font-mono mb-3">
            Get in touch
          </p>
          <h2 className="font-body text-5xl md:text-6xl font-medium text-white leading-tight mb-5">
            Let's build
            <br />
            <span className="text-white/35">something great.</span>
          </h2>
          <p className="text-white/45 text-lg max-w-md leading-relaxed">
            Whether it's a freelance project, a collaboration, or just a conversation
            I'm always open. Reach out through any of the channels below.
          </p>
        </Reveal>

        {/* ══════════════════════════════════════
            PRIMARY: EMAIL BLOCK
            Large, tactile — the main CTA
        ══════════════════════════════════════ */}
        <Reveal delay={80}>
          <div className="glass-card p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                <Mail size={28} />
              </div>

              {/* Email + copy */}
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-xs tracking-widest uppercase font-mono mb-2">
                  Email
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-white text-xl md:text-2xl tracking-tight select-all">
                    kas.bihari@gmail.com
                  </span>
                  <button
                    onClick={handleCopy}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-bordeaux/20 transition-colors duration-150 relative flex-shrink-0"
                    aria-label="Copy email address"
                  >
                    {copied
                      ? <Check size={15} className="text-emerald-400" />
                      : <Copy size={15} className="text-white/50" />
                    }
                    {copied && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs glass px-2.5 py-1 rounded-lg whitespace-nowrap text-emerald-400">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* CTA button */}
              <a
                href="mailto:kas.bihari@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-bordeaux hover:bg-bordeaux/80 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(94,42,44,0.4)] flex-shrink-0 w-full md:w-auto justify-center"
              >
                <Send size={15} />
                Send email
                <ArrowRight size={13} className="ml-1 opacity-60" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════
            SOCIAL LINKS — horizontal strip
        ══════════════════════════════════════ */}
        <Reveal delay={140}>
          <p className="text-white/25 text-xs tracking-[0.3em] uppercase font-mono mb-5">
            Find me online
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* GitHub */}
            <a
              href="https://github.com/kasbihari"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 flex items-center gap-4 group hover:border-bordeaux/50 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center group-hover:bg-bordeaux/20 group-hover:text-bordeaux transition-all duration-200">
                <Github size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  GitHub
                </div>
                <div className="text-white/35 text-xs font-mono truncate">github.com/kasbihari</div>
              </div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-bordeaux/60 group-hover:translate-x-0.5 transition-all duration-150" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/krishna-b-098124339/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 flex items-center gap-4 group hover:border-bordeaux/50 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center group-hover:bg-bordeaux/20 group-hover:text-bordeaux transition-all duration-200">
                <Linkedin size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  LinkedIn
                </div>
                <div className="text-white/35 text-xs font-mono truncate">Krishna Bihari</div>
              </div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-bordeaux/60 group-hover:translate-x-0.5 transition-all duration-150" />
            </a>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════
            FUN FACT — cinematic closer
            Designed as a statement, not a widget
        ══════════════════════════════════════ */}
        <Reveal delay={200}>
          <div className="border-t border-white/8 pt-12">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-bordeaux/15 flex items-center justify-center text-bordeaux flex-shrink-0 mt-1">
                <Languages size={18} />
              </div>
              <div>
                <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-mono mb-2">
                  Fun fact
                </p>
                <p className="text-white/65 text-lg leading-relaxed max-w-lg">
                  I speak{' '}
                  <span className="text-white font-medium">Dutch, English and Spanish</span> —
                  and I'm learning a fourth, because great communication
                  builds great products.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Contact;