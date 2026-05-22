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

  return (
    <section
      ref={containerRef}
      style={{ minHeight: '100svh' }}
      className="relative flex flex-col justify-between pt-36 pb-16"
    >
      {/* Top row — label + availability */}
      <div className="container-main flex items-center justify-between">
        <span
          data-hero-reveal
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="section-label"
        >
          Krishna Bihari
        </span>

        <div
          data-hero-reveal
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="flex items-center gap-2"
        >
          <span
            style={{ background: 'var(--forest-bright)' }}
            className="w-1.5 h-1.5 rounded-full"
          />
          <span
            style={{ color: 'var(--muted-light)', fontSize: '0.75rem', letterSpacing: '0.08em' }}
          >
            Available for work
          </span>
        </div>
      </div>

      {/* Main headline */}
      <div className="container-main">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <p
            data-hero-reveal
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
              color: 'var(--sand)',
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '1.5rem',
            }}
          >
            Full-Stack · AI · Product Engineering
          </p>

          {/* Display headline */}
          <h1
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: 'var(--soft-white)',
              marginBottom: '2rem',
            }}
          >
            <span
              data-hero-reveal
              style={{
                display: 'block',
                opacity: 0,
                transform: 'translateY(32px)',
                transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              Building products
            </span>
            <span
              data-hero-reveal
              style={{
                display: 'block',
                opacity: 0,
                transform: 'translateY(32px)',
                transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                fontFamily: 'Playfair Display, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--sand-light)',
              }}
            >
              with engineering depth.
            </span>
          </h1>

          {/* Sub-statement */}
          <p
            data-hero-reveal
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
              color: 'var(--muted-light)',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: '3rem',
            }}
          >
            I design and ship full-stack systems — from architecture to interface —
            with a focus on AI integration, performance, and long-term scalability.
          </p>

          {/* CTAs */}
          <div
            data-hero-reveal
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <a href="#projects" className="btn-primary">
              View Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/CV-Krishna.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Download CV
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom row — scroll indicator + stats */}
      <div className="container-main flex items-end justify-between">
        {/* Stats */}
        <div
          data-hero-reveal
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            display: 'flex',
            gap: '3rem',
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
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: 'var(--soft-white)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          data-hero-reveal
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '3rem',
              background: 'linear-gradient(to bottom, var(--border-mid), transparent)',
            }}
          />
        </div>
      </div>

      {/* Horizontal divider bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        className="divider"
      />
    </section>
  );
}