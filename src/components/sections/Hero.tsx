import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('[data-hero-reveal]');
    if (!els) return;
    els.forEach((el, i) => {
      const delay = i * 120;
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 400 + delay);
    });
  }, []);

  const revealBase: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(32px)',
    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="full-screen"
      style={{ paddingTop: '64px' }}
    >
      <div className="container-main" style={{ width: '100%' }}>

        {/* ── Top row ── */}
        <div
          data-hero-reveal
          style={{
            ...revealBase,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Name — Amsterdam Four */}
          <span
            style={{
              fontFamily: 'var(--font-name)',
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              color: 'var(--soft-white)',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            Krishna Bihari
          </span>

          {/* Availability badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              border: '1px solid rgba(74,124,106,0.4)',
              borderRadius: '100px',
              background: 'rgba(74,124,106,0.08)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--forest-bright)',
                boxShadow: '0 0 8px rgba(74,124,106,0.8)',
                animation: 'pulse 2s infinite',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--forest-bright)',
                fontWeight: 500,
              }}
            >
              Available for work
            </span>
          </div>
        </div>

        {/* ── Main headline block ── */}
        <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>

          {/* Eyebrow */}
          <div
            data-hero-reveal
            style={{
              ...revealBase,
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--sand)',
              marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                height: '1px',
                background: 'var(--sand)',
                flexShrink: 0,
              }}
            />
            Full-Stack · AI · Product Engineering
          </div>

          {/* Display headline */}
          <h1
            data-hero-reveal
            style={{
              ...revealBase,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 7vw, 5.8rem)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'var(--soft-white)',
              marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
            }}
          >
            Building products
          </h1>
          <h1
            data-hero-reveal
            style={{
              ...revealBase,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 7vw, 5.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'var(--off-white)',
              marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            with engineering depth.
          </h1>

          {/* Sub-statement */}
          <p
            data-hero-reveal
            style={{
              ...revealBase,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              lineHeight: 1.75,
              color: 'var(--muted-light)',
              maxWidth: '540px',
            }}
          >
            I design and ship full-stack systems — from architecture to interface —
            with a focus on AI integration, performance, and long-term scalability.
          </p>
        </div>

        {/* ── CTAs ── */}
        <div
          data-hero-reveal
          style={{
            ...revealBase,
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(3rem, 8vw, 6rem)',
          }}
        >
          <a href="#projects" className="btn-primary">
            View Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/CV-Krishna-Bihari.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
            Download CV
          </a>
        </div>

        {/* ── Bottom row — stats + scroll ── */}
        <div
          data-hero-reveal
          style={{
            ...revealBase,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(1.5rem, 5vw, 3.5rem)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { number: '3+', label: 'Years building' },
              { number: '15+', label: 'Projects shipped' },
              { number: 'Full', label: 'Stack coverage' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 500,
                    color: 'var(--soft-white)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--muted)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: '1px',
                height: '32px',
                background: 'linear-gradient(to bottom, var(--muted), transparent)',
                animation: 'scrollFade 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

      </div>

      {/* Pulse + scroll animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes scrollFade {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}