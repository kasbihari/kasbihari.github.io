import { useState } from 'react';

const projects = [
  {
    id: 1,
    index: '01',
    label: 'Full-Stack SaaS',
    title: 'FlowgenAI',
    tagline: 'AI-powered content generation platform for marketing teams.',
    description:
      'Built the complete product from zero — authentication, subscription billing, AI pipeline, and a real-time editor. Designed for speed and reliability at scale.',
    outcome: '3x faster content output for early users.',
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Stripe', 'PostgreSQL', 'Prisma'],
    architecture: ['REST API + streaming', 'Role-based access', 'Webhook billing sync', 'Edge-cached responses'],
    link: 'https://github.com/kasbihari',
    live: '',
    accent: 'var(--forest-bright)',
  },
  {
    id: 2,
    index: '02',
    label: 'Internal Tooling',
    title: 'Data Pipeline Dashboard',
    tagline: 'Real-time monitoring system for automated data workflows.',
    description:
      'Engineered an internal platform to monitor, debug, and re-trigger ETL pipelines. Reduced manual intervention by surfacing errors with full context and one-click recovery.',
    outcome: '80% reduction in manual pipeline debugging time.',
    stack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
    architecture: ['Event-driven architecture', 'WebSocket live updates', 'Containerized workers', 'Audit logging'],
    link: 'https://github.com/kasbihari',
    live: '',
    accent: 'var(--sand)',
  },
  {
    id: 3,
    index: '03',
    label: 'Developer Tool',
    title: 'CLI Scaffold Generator',
    tagline: 'Opinionated project scaffolding tool for full-stack teams.',
    description:
      'Built a CLI that generates production-ready project structures with TypeScript, testing, Docker, and CI/CD pre-configured. Used internally and open-sourced.',
    outcome: 'Setup time cut from hours to under 2 minutes.',
    stack: ['Node.js', 'TypeScript', 'Shell', 'GitHub Actions'],
    architecture: ['Plugin-based template system', 'Interactive prompts', 'Git init + remote setup', 'Auto dependency install'],
    link: 'https://github.com/kasbihari',
    live: '',
    accent: 'var(--muted-light)',
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding">
      <div className="container-main">

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              data-reveal
              className="section-label"
            >
              Selected Work
            </p>
            <h2
              data-reveal
              data-delay="100"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: 'var(--soft-white)',
                lineHeight: 1.05,
                maxWidth: '480px',
              }}
            >
              Products I've{' '}
              <span
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--sand-light)',
                }}
              >
                built & shipped.
              </span>
            </h2>
          </div>

          <p
            data-reveal
            data-delay="200"
            style={{
              fontSize: '0.875rem',
              color: 'var(--muted)',
              maxWidth: '260px',
              lineHeight: 1.7,
              textAlign: 'right',
            }}
          >
            End-to-end ownership — from architecture decisions to production deployment.
          </p>
        </div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-reveal
              data-delay={`${i * 80}`}
            >
              {/* Top divider */}
              <div className="divider" />

              <div
                onClick={() =>
                  setActiveProject(activeProject === project.id ? null : project.id)
                }
                style={{
                  padding: '2.5rem 0',
                  cursor: 'pointer',
                  display: 'grid',
                  gridTemplateColumns: '4rem 1fr auto',
                  gap: '2rem',
                  alignItems: 'start',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = '0.85';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {/* Index */}
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.08em',
                    paddingTop: '0.15rem',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {project.index}
                </span>

                {/* Main content */}
                <div>
                  {/* Label */}
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: project.accent,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {project.label}
                  </p>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      color: 'var(--soft-white)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.1,
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--muted-light)',
                      lineHeight: 1.6,
                    }}
                  >
                    {project.tagline}
                  </p>

                  {/* Expanded case study */}
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: activeProject === project.id ? '600px' : '0',
                      transition: 'max-height 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                      opacity: activeProject === project.id ? 1 : 0,
                    }}
                  >
                    <div
                      style={{
                        paddingTop: '2rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '2.5rem',
                      }}
                    >
                      {/* Description */}
                      <div>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            marginBottom: '0.75rem',
                          }}
                        >
                          Overview
                        </p>
                        <p
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--muted-light)',
                            lineHeight: 1.7,
                          }}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Outcome */}
                      <div>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            marginBottom: '0.75rem',
                          }}
                        >
                          Outcome
                        </p>
                        <p
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 500,
                            color: project.accent,
                            lineHeight: 1.5,
                          }}
                        >
                          {project.outcome}
                        </p>
                      </div>

                      {/* Architecture */}
                      <div>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            marginBottom: '0.75rem',
                          }}
                        >
                          Architecture
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {project.architecture.map((a) => (
                            <div
                              key={a}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                fontSize: '0.85rem',
                                color: 'var(--muted-light)',
                              }}
                            >
                              <span
                                style={{
                                  width: '3px',
                                  height: '3px',
                                  borderRadius: '50%',
                                  background: 'var(--border-mid)',
                                  flexShrink: 0,
                                }}
                              />
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stack */}
                      <div>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            marginBottom: '0.75rem',
                          }}
                        >
                          Stack
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.3rem 0.75rem',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '3px',
                                color: 'var(--muted-light)',
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.02em',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on GitHub
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live site
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '0.3rem',
                    color: 'var(--muted)',
                    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s',
                    transform: activeProject === project.id ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom divider */}
          <div className="divider" />
        </div>

        {/* Footer note */}
        <p
          data-reveal
          style={{
            marginTop: '3rem',
            fontSize: '0.8rem',
            color: 'var(--muted)',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          More work available on{' '}
          <a
            href="https://github.com/kasbihari"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--sand)',
              borderBottom: '1px solid var(--sand-dark)',
              paddingBottom: '1px',
              transition: 'color 0.3s, border-color 0.3s',
            }}
          >
            GitHub
          </a>
        </p>

      </div>
    </section>
  );
}