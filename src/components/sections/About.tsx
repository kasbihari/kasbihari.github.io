import { useEffect, useRef, useState } from 'react';

const readingLines = [
  { id: 0, text: "I'm Krishna — a full-stack engineer based in the Netherlands." },
  { id: 1, text: "I build complete products from the ground up." },
  { id: 2, text: "Architecture, backend systems, interfaces — the full stack." },
  { id: 3, text: "My focus is on AI integration and scalable engineering." },
  { id: 4, text: "Not just writing code, but designing systems that last." },
  { id: 5, text: "I've shipped SaaS tools, internal platforms, and data pipelines." },
  { id: 6, text: "Each project starts with a problem worth solving." },
  { id: 7, text: "And ends with something I'm proud to put my name on." },
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

export default function About() {
  const sectionRef      = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect     = section.getBoundingClientRect();
      const total    = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      const index = Math.floor(progress * readingLines.length);
      setActiveIndex(Math.min(index, readingLines.length - 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about">

      {/* ── Flowgen scroll reading ── */}
      <div
        ref={sectionRef}
        style={{ height: `${readingLines.length * 120}vh` }}
      >
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Radial glow behind text */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(ellipse at center, rgba(200,184,154,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>

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

            {/* Reading lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '720px' }}>
              {readingLines.map((line, i) => {
                const isPast   = i < activeIndex;
                const isActive = i === activeIndex;
                const isFuture = i > activeIndex;

                return (
                  <p
                    key={line.id}
                    style={{
                      fontSize: 'clamp(1.15rem, 2.2vw, 1.65rem)',
                      fontWeight: 400,
                      lineHeight: 1.55,
                      letterSpacing: '-0.01em',
                      transition: 'color 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                      color: isActive
                        ? 'var(--soft-white)'
                        : isPast
                        ? 'var(--charcoal-4)'
                        : 'var(--muted)',
                      opacity: isFuture ? 0.45 : isPast ? 0.25 : 1,
                      cursor: 'default',
                    }}
                  >
                    {/* Active line gets a sand left border */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          width: '3px',
                          height: '1em',
                          background: 'var(--sand)',
                          borderRadius: '2px',
                          marginRight: '0.75rem',
                          verticalAlign: 'middle',
                          transition: 'opacity 0.3s',
                        }}
                      />
                    )}
                    {line.text}
                  </p>
                );
              })}
            </div>

            {/* Scroll hint */}
            <p
              style={{
                marginTop: '2.5rem',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                opacity: activeIndex < readingLines.length - 1 ? 0.6 : 0,
                transition: 'opacity 0.4s',
              }}
            >
              Keep scrolling
            </p>
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

              {/* Qualities */}
              <div
                data-reveal
                data-delay="200"
                style={{
                  marginTop: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
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
                      paddingLeft: '0',
                      position: 'relative',
                    }}
                  >
                    {/* Dot on timeline */}
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
                      <p
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: 'var(--soft-white)',
                          marginBottom: '0.2rem',
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--sand)',
                          marginBottom: '0.5rem',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {item.place}
                      </p>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--muted)',
                          lineHeight: 1.65,
                        }}
                      >
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