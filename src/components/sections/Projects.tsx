import { useState } from 'react';

type ProjectStatus = 'done' | 'in-progress';
type FilterValue = 'all' | ProjectStatus;

type Project = {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  outcome: string;
  architecture: string[];
  stack: string[];
  link: string;
  accent: string;
  live?: string;
  status: ProjectStatus;
};

const projects: Project[] = [
  {
    id: '01',
    category: 'FULL-STACK WEB APP',
    title: 'Budget Buddy',
    tagline: 'Sleek personal finance manager with a premium dashboard and reporting engine.',
    description:
      'End-to-end finance platform built in Symfony with Chart.js. Handles transaction management, budget categorisation, role-based user/admin system, and rich data visualisation — all wrapped in a clean, premium UI.',
    outcome: 'Full production deploy with secure auth, real-time reporting, and admin controls.',
    architecture: ['Symfony 6', 'Twig', 'Doctrine ORM', 'Chart.js', 'MySQL', 'REST API', 'Role-based access control'],
    stack: ['Symfony', 'PHP', 'Twig', 'Chart.js', 'MySQL', 'Doctrine ORM'],
    link: 'https://github.com/kasbihari/Budget-Buddy',
    accent: 'var(--sand-light)',
    status: 'done',
  },
  {
    id: '02',
    category: 'FULL-STACK DATA PLATFORM',
    title: 'SDG Dashboard',
    tagline: 'Real-time UN Sustainable Development Goals tracker with AI-powered insights.',
    description:
      'Comprehensive data visualisation platform built with Next.js and TypeScript. Tracks live SDG KPIs via interactive charts, includes an AI chatbot for contextual insights, user authentication, and CSV export — all backed by MySQL with Prisma ORM.',
    outcome: 'Complete full-stack system: auth, AI chatbot, live KPI tracking, and export pipeline.',
    architecture: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'MySQL', 'OpenAI API', 'NextAuth', 'Recharts'],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'OpenAI API', 'NextAuth'],
    link: 'https://github.com/kasbihari/SDG-Dashboard',
    accent: 'var(--forest-bright)',
    status: 'done',
  },
  {
    id: '03',
    category: 'AI VOICE & MESSAGING BOT',
    title: 'OutreachBot',
    tagline: 'Intelligent outbound call & SMS automation driven by CSV/XLS data and AI.',
    description:
      'Node.js + React platform that reads contact lists from CSV/XLS files and triggers personalised outbound calls and SMS messages via MessageBird. Integrates OpenAI to generate dynamic conversation scripts and handles reporting back on delivery and response rates.',
    outcome: 'Automated multi-channel outreach pipeline — active development.',
    architecture: ['Node.js', 'React', 'MessageBird API', 'OpenAI API', 'CSV/XLS parsing', 'REST API'],
    stack: ['Node.js', 'React', 'MessageBird', 'OpenAI API', 'TypeScript'],
    link: 'https://github.com/kasbihari',
    accent: 'var(--muted-light)',
    status: 'in-progress',
  },
];

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Shipped', value: 'done' },
  { label: 'In Progress', value: 'in-progress' },
];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const isDone = status === 'done';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '0.25rem 0.65rem',
        borderRadius: '3px',
        border: `1px solid ${isDone ? 'rgba(100,200,130,0.3)' : 'rgba(200,160,80,0.3)'}`,
        color: isDone ? 'var(--forest-bright)' : '#c8a050',
        background: isDone ? 'rgba(100,200,130,0.07)' : 'rgba(200,160,80,0.07)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: isDone ? 'var(--forest-bright)' : '#c8a050',
          boxShadow: isDone
            ? '0 0 5px var(--forest-bright)'
            : '0 0 5px #c8a050',
          animation: isDone ? 'none' : 'pulse 2s ease-in-out infinite',
        }}
      />
      {isDone ? 'Shipped' : 'In Progress'}
    </span>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.status === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container-main">

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p data-reveal className="section-label">Selected Work</p>
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

        {/* Filter tabs */}
        <div
          data-reveal
          data-delay="150"
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map(({ label, value }) => {
            const isActive = filter === value;
            const count =
              value === 'all'
                ? projects.length
                : projects.filter((p) => p.status === value).length;

            return (
              <button
                key={value}
                onClick={() => {
                  setFilter(value);
                  setActiveProject(null);
                }}
                aria-pressed={isActive}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  border: `1px solid ${isActive ? 'var(--border-mid)' : 'var(--border-subtle)'}`,
                  background: isActive ? 'var(--charcoal-2)' : 'transparent',
                  color: isActive ? 'var(--soft-white)' : 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--muted-light)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                {label}
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '3px',
                    background: isActive ? 'var(--border-mid)' : 'var(--border-subtle)',
                    color: isActive ? 'var(--soft-white)' : 'var(--muted)',
                    fontFamily: 'JetBrains Mono, monospace',
                    transition: 'all 0.25s',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', padding: '2rem 0' }}>
              No projects found.
            </p>
          )}

          {filtered.map((project, i) => (
            <div
              key={project.id}
              data-reveal
              data-delay={`${i * 80}`}
            >
              <div className="divider" />

              <div
                onClick={() =>
                  setActiveProject(activeProject === project.id ? null : project.id)
                }
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem) 0',
                  cursor: 'pointer',
                  display: 'grid',
                  gridTemplateColumns: 'clamp(2.5rem, 6vw, 4rem) 1fr auto',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                  alignItems: 'start',
                  transition: 'opacity 0.3s',
                }}
                role="button"
                aria-expanded={activeProject === project.id}
                aria-controls={`project-detail-${project.id}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveProject(activeProject === project.id ? null : project.id);
                  }
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
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
                  {project.id}
                </span>

                {/* Main content */}
                <div>
                  {/* Category + Status badge row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: project.accent,
                        margin: 0,
                      }}
                    >
                      {project.category}
                    </p>
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
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
                    id={`project-detail-${project.id}`}
                    style={{
                      overflow: 'hidden',
                      maxHeight: activeProject === project.id ? '800px' : '0',
                      transition: 'max-height 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                      opacity: activeProject === project.id ? 1 : 0,
                    }}
                  >
                    <div
                      style={{
                        paddingTop: '2rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
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
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted-light)', lineHeight: 1.7 }}>
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
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        marginTop: '2rem',
                        flexWrap: 'wrap',
                      }}
                    >
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
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div
                  aria-hidden="true"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '0.3rem',
                    color: 'var(--muted)',
                    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s',
                    transform: activeProject === project.id ? 'rotate(45deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

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

      {/* Pulse animation for in-progress badge dot */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}