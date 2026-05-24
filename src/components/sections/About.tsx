import { useEffect, useRef, useState, useCallback } from 'react';

const readingLines = [
  { id: 0,  text: "I'm Krishna — a full-stack engineer based in the Netherlands." },
  { id: 1,  text: "I build complete products from the ground up." },
  { id: 2,  text: "Architecture, backend systems, interfaces — the full stack." },
  { id: 3,  text: "I've been coding seriously since 2022." },
  { id: 4,  text: "Started by shipping real apps. Learned by doing, not watching." },
  { id: 5,  text: "My focus is on AI integration and scalable engineering." },
  { id: 6,  text: "Not just writing code — designing systems that last." },
  { id: 7,  text: "I've built SaaS tools, internal platforms, and data pipelines." },
  { id: 8,  text: "Currently studying HBO-ICT while freelancing on the side." },
  { id: 9,  text: "I care about the details — in the code and in the experience." },
  { id: 10, text: "Each project starts with a problem worth solving." },
  { id: 11, text: "And ends with something I'm proud to put my name on." },
];

const timelineItems = [
  {
    year: '2024 — now',
    title: 'Full-Stack Developer',
    place: 'Freelance / Independent',
    description: 'Building client products and internal tools. Focus on React, Node.js, and AI-powered features.',
  },
  {
    year: '2023',
    title: 'Software Engineering Student',
    place: 'HBO-ICT',
    description: 'Full-stack development, databases, software architecture, and agile project delivery.',
  },
  {
    year: '2022',
    title: 'First Production Apps',
    place: 'Self-directed',
    description: 'Shipped first real-world applications. Learned by building, iterating, and deploying.',
  },
];

// How long each line stays fully lit before moving on (ms)
const LINE_DURATION = 1600;
// Fade-in duration for new line (ms) — matches CSS transition
const FADE_DURATION = 500;

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [done,        setDone]        = useState(false);

  // Use a ref for the index so the setTimeout callback always sees the latest value
  const indexRef = useRef(-1);

  const advance = useCallback(() => {
    const next = indexRef.current + 1;
    if (next >= readingLines.length) {
      setDone(true);
      return;
    }
    indexRef.current = next;
    setActiveIndex(next);
    timerRef.current = setTimeout(advance, LINE_DURATION);
  }, []);

  const start = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDone(false);
    indexRef.current = 0;
    setActiveIndex(0);
    timerRef.current = setTimeout(advance, LINE_DURATION);
  }, [advance]);

  // Auto-start when section scrolls into view — only once
  const startedRef = useRef(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          timerRef.current = setTimeout(start, 600);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [start]);

  const progressPct = done
    ? 100
    : activeIndex < 0
    ? 0
    : Math.round(((activeIndex + 1) / readingLines.length) * 100);

  return (
    <section id="about">

      {/* ── Auto-play reading section ── */}
      <div
        ref={sectionRef}
        style={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(200,184,154,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-main" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5rem' }}>

          {/* Section label */}
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--sand)',
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ display: 'block', width: '1.5rem', height: '1px', background: 'var(--sand)', opacity: 0.6 }} />
            About
          </p>

          {/* Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', maxWidth: '720px' }}>
            {readingLines.map((line, i) => {
              const isPast   = i < activeIndex;
              const isActive = i === activeIndex;
              const isFuture = i > activeIndex;

              return (
                <p
                  key={line.id}
                  style={{
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    letterSpacing: '-0.01em',
                    color: isActive
                      ? 'var(--soft-white)'
                      : isPast
                      ? 'rgba(240,236,228,0.22)'
                      : 'var(--muted)',
                    opacity: isFuture ? 0.4 : 1,
                    transition: `color ${FADE_DURATION}ms cubic-bezier(0.16,1,0.3,1), opacity ${FADE_DURATION}ms cubic-bezier(0.16,1,0.3,1)`,
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  {/* Active indicator bar */}
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      flexShrink: 0,
                      width: '3px',
                      height: '1em',
                      borderRadius: '2px',
                      background: 'var(--sand)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleY(1)' : 'scaleY(0.3)',
                      transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms cubic-bezier(0.16,1,0.3,1)`,
                    }}
                  />
                  {line.text}
                </p>
              );
            })}
          </div>

          {/* Progress bar + optional replay */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '200px',
                height: '2px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progressPct}%`,
                  background: 'linear-gradient(90deg, var(--sand-dark), var(--sand-light))',
                  borderRadius: '2px',
                  transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>

            {done && (
              <button
                onClick={start}
                aria-label="Replay"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8a6 6 0 1 0 1.5-3.9L2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 3v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Replay
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="divider" />

      {/* ── Timeline + details ── */}
      <div className="section-padding">
        <div className="container-main">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '4rem',
            }}
          >
            {/* Left — intro block */}
            <div>
              <p
                data-reveal
                data-delay="0"
                style={{ color: 'var(--muted-light)', lineHeight: 1.8, marginBottom: '2rem' }}
              >
                I specialize in full-stack systems where design, engineering,
                and product thinking intersect. I care about the details —
                both in the code and in the experience.
              </p>
              <p
                data-reveal
                data-delay="100"
                style={{ color: 'var(--muted)', lineHeight: 1.8 }}
              >
                Currently exploring the intersection of AI tooling and
                developer-facing products. I'm available for freelance
                work and open to interesting long-term collaborations.
              </p>

              <div
                data-reveal
                data-delay="200"
                style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                {[
                  'Systems thinking over isolated features',
                  'Shipping over perfecting',
                  'Clarity in code and communication',
                  'Long-term scalability from day one',
                ].map((q) => (
                  <div
                    key={q}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--muted-light)',
                    }}
                  >
                    <span
                      style={{
                        marginTop: '0.45rem',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--sand)',
                        flexShrink: 0,
                      }}
                    />
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — timeline */}
            <div>
              <p
                data-reveal
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--sand)',
                  marginBottom: '2rem',
                }}
              >
                Timeline
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {timelineItems.map((item, i) => (
                  <div
                    key={item.year}
                    data-reveal
                    data-delay={`${i * 120}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '7rem 1fr',
                      gap: '1.5rem',
                      paddingBottom: '2rem',
                      borderLeft: '1px solid var(--border-subtle)',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '-4.5px',
                        top: '0.35rem',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--charcoal-3)',
                        border: '1px solid var(--border-mid)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--muted)',
                        paddingTop: '0.1rem',
                        paddingLeft: '1.25rem',
                      }}
                    >
                      {item.year}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--soft-white)', marginBottom: '0.2rem' }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--sand)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                        {item.place}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}