import React, { useState, useRef, useEffect } from 'react';
import {
  Mail, Github, Linkedin, Copy, Check,
  ArrowRight, Languages, Send,
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

/* ─── Scroll-reveal hook (ongewijzigd) ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
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

/* ─── Papieren vliegtuigje SVG (reusable) ─── */
const PaperPlaneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 22 8.5 12 15 2 8.5" />
    <line x1="12" y1="15" x2="12" y2="22" />
    <line x1="8" y1="18" x2="12" y2="22" />
    <line x1="16" y1="18" x2="12" y2="22" />
  </svg>
);

/* ─── Contact page ─── */
const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Formspree – let op de reset-functie
  const [formState, handleSubmit, resetFormspree] = useForm('mbdwvkgq');

  // Honeypot state
  const [honeypot, setHoneypot] = useState('');
  const [fakeSuccess, setFakeSuccess] = useState(false);

  // Key om het formulier te resetten na succes
  const [formKey, setFormKey] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText('kas.bihari@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (honeypot) {
      e.preventDefault();
      setFakeSuccess(true); // bot denkt dat het gelukt is
      return;
    }
    handleSubmit(e); // normale verzending via Formspree
  };

  const resetForm = () => {
    resetFormspree();            // Formspree-status terug naar idle
    setFakeSuccess(false);
    setHoneypot('');
    setFormKey((prev) => prev + 1);
  };

  const isSuccess = formState.succeeded || fakeSuccess;

  return (
    <section className="min-h-screen px-6 md:px-16 py-20 flex items-center">
      {/* Inline animatie-definitie */}
      <style>{`
        @keyframes fly {
          0%   { transform: translateX(0) rotate(0deg); }
          50%  { transform: translateX(8px) rotate(10deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        .animate-fly {
          animation: fly 0.8s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      <div className="max-w-4xl w-full mx-auto space-y-20">
        {/* ══════════════════════════════════════
            HEADER
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
        ══════════════════════════════════════ */}
        <Reveal delay={80}>
          <div className="glass-card p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="w-16 h-16 rounded-2xl bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                <Mail size={28} />
              </div>
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
                    {copied ? (
                      <Check size={15} className="text-emerald-400" />
                    ) : (
                      <Copy size={15} className="text-white/50" />
                    )}
                    {copied && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs glass px-2.5 py-1 rounded-lg whitespace-nowrap text-emerald-400">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
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
            CONTACT FORM (Formspree + honeypot)
        ══════════════════════════════════════ */}
        <Reveal delay={110}>
          <div className="glass-card p-8 md:p-10">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-mono mb-5">
              Or send a message
            </p>

            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <Check size={32} className="text-emerald-400 mx-auto" />
                <p className="text-white text-lg">Message sent!</p>
                <p className="text-white/40 text-sm">
                  I'll get back to you soon.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 text-bordeaux hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form key={formKey} onSubmit={onSubmit} className="space-y-6" noValidate>
                {/* Honeypot – visually hidden for humans */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                  <label htmlFor="bot-field">Leave this field blank</label>
                  <input
                    type="text"
                    id="bot-field"
                    name="bot-field"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-bordeaux/50 focus:ring-1 focus:ring-bordeaux/30 transition-all"
                      placeholder="Your name"
                    />
                    <ValidationError field="name" errors={formState.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-bordeaux/50 focus:ring-1 focus:ring-bordeaux/30 transition-all"
                      placeholder="your@email.com"
                    />
                    <ValidationError field="email" errors={formState.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-bordeaux/50 focus:ring-1 focus:ring-bordeaux/30 transition-all resize-none"
                    placeholder="Tell me what you'd like to discuss..."
                  />
                  <ValidationError field="message" errors={formState.errors} className="text-red-400 text-xs mt-1" />
                </div>

                {/* Algemene / server-fouten */}
                <ValidationError errors={formState.errors} className="text-red-400 text-sm flex items-center gap-2" />

                <button
                  type="submit"
                  disabled={formState.submitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-bordeaux hover:bg-bordeaux/80 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(94,42,44,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {/* Vliegtuigje altijd zichtbaar, alleen animeren tijdens verzenden */}
                  <PaperPlaneIcon className={formState.submitting ? 'animate-fly' : ''} />
                  {formState.submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* ══════════════════════════════════════
            SOCIAL LINKS
        ══════════════════════════════════════ */}
        <Reveal delay={140}>
          <p className="text-white/25 text-xs tracking-[0.3em] uppercase font-mono mb-5">
            Find me online
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="text-white/35 text-xs font-mono truncate">
                  github.com/kasbihari
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-white/20 group-hover:text-bordeaux/60 group-hover:translate-x-0.5 transition-all duration-150"
              />
            </a>

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
                <div className="text-white/35 text-xs font-mono truncate">
                  Krishna Bihari
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-white/20 group-hover:text-bordeaux/60 group-hover:translate-x-0.5 transition-all duration-150"
              />
            </a>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════
            FUN FACT
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
                  <span className="text-white font-medium">
                    Dutch, English and Spanish
                  </span>{' '}
                  — and I'm learning a fourth, because great communication
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