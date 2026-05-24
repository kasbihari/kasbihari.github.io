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
    category: 'Full-Stack Web App',
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
    category: 'Full-Stack Data Platform',
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
    category: 'AI Voice & Messaging Bot',
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
        gap: '0.35rem',
        fontSize: '0.68rem',
        fontWeight: 500,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        padding: '0.2rem 0.55rem',
        borderRadius: '3px',
        border: `1px solid ${isDone ? 'rgba(100,200,130,0.25)' : 'rgba(200,160,80,0.25)'}`,
        color: isDone ? 'var(--forest-bright)' : '#c8a050',
        background: isDone ? 'rgba(100,200,130,0.06)' : 'rgba(200,160,80,0.06)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: isDone ? 'var(--forest-bright)' : '#c8a050',
          animation: isDone ? 'none' : 'statusPulse 2s ease-in-out infinite',
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

  const counts = {
    all: projects.length,
    done: projects.filter((p) => p.status === 'done').length,
    'in-progress': projects.filter((p) => p.status === 'in-progress').length,
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-main">

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
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

          {/* Filter pills — right-aligned on desktop */}
          <div
            data-reveal
            data-delay="150"
            style={{
              display: 'flex',
              gap: '0.35rem',
              alignItems: 'center',
              flexShrink: 0,
            }}
            role="group"
            aria-label="Filter projects"
          >
            {FILTERS.map(({ label, value }) => {
              const isActive = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => { setFilter(value); setActiveProject(null); }}
                  aria-pressed={isActive}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.9rem',
                    fontSize: '0.76rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    borderRadius: '100px',
                    border: `1px solid ${isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: isActive ? 'var(--soft-white)' : 'var(--muted)',
                    cursor: 'pointer',
                    transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--muted-light)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--muted)'; }}
                >
                  {label}
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '0.05rem 0.35rem',
                      borderRadius: '100px',
                      background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                      color: isActive ? 'var(--soft-white)' : 'var(--muted)',
                      transition: 'all 0.22s',
                      lineHeight: 1.6,
                    }}
                  >
                    {counts[value]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', padding: '2rem 0' }}>
              No projects found.
            </p>
          )}

          {filtered.map((project, i) => {
            const isOpen = activeProject === project.id;
            return (
              <div key={project.id}>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: 'rgba(255,255,255,0.06)',
                  }}
                />

                <div
                  onClick={() => setActiveProject(isOpen ? null : project.id)}
                  style={{
                    padding: 'clamp(1.25rem, 2.5vw, 2rem) 0',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: 'clamp(2.5rem, 5vw, 3.5rem) 1fr auto',
                    gap: 'clamp(1rem, 2.5vw, 2rem)',
                    alignItems: 'start',
                  }}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`project-detail-${project.id}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProject(isOpen ? null : project.id);
                    }
                  }}
                >
                  {/* Index number */}
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.08em',
                      paddingTop: '0.2rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      transition: 'color 0.25s',
                    }}
                  >
                    {project.id}
                  </span>

                  {/* Main content */}
                  <div>
                    {/* Top row: category label + status */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.6rem',
                        marginBottom: '0.45rem',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: project.accent,
                          margin: 0,
                          opacity: 0.85,
                        }}
                      >
                        {project.category}
                      </p>
                      <StatusBadge status={project.status} />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.15rem, 2.8vw, 2rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: 'var(--soft-white)',
                        marginBottom: '0.4rem',
                        lineHeight: 1.1,
                        transition: 'color 0.25s',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--muted-light)',
                        lineHeight: 1.6,
                        maxWidth: '520px',
                      }}
                    >
                      {project.tagline}
                    </p>

                    {/* Stack pills — always visible, subtle */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                        marginTop: '0.85rem',
                      }}
                    >
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.15rem 0.55rem',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '3px',
                            color: 'var(--muted)',
                            fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.02em',
                            background: 'rgba(255,255,255,0.02)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.15rem 0.55rem',
                            color: 'var(--muted)',
                            fontFamily: 'JetBrains Mono, monospace',
                          }}
                        >
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Expanded detail */}
                    <div
                      id={`project-detail-${project.id}`}
                      style={{
                        overflow: 'hidden',
                        maxHeight: isOpen ? '900px' : '0',
                        opacity: isOpen ? 1 : 0,
                        transition: 'max-height 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.45s cubic-bezier(0.16,1,0.3,1)',
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
                          <p style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.65rem' }}>
                            Overview
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--muted-light)', lineHeight: 1.75 }}>
                            {project.description}
                          </p>
                        </div>

                        {/* Outcome */}
                        <div>
                          <p style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.65rem' }}>
                            Outcome
                          </p>
                          <p style={{ fontSize: '1rem', fontWeight: 500, color: project.accent, lineHeight: 1.5 }}>
                            {project.outcome}
                          </p>
                        </div>

                        {/* Architecture */}
                        <div>
                          <p style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.65rem' }}>
                            Architecture
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {project.architecture.map((a) => (
                              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--muted-light)' }}>
                                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                                {a}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Full stack */}
                        <div>
                          <p style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.65rem' }}>
                            Full Stack
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  fontSize: '0.73rem',
                                  padding: '0.25rem 0.65rem',
                                  border: '1px solid rgba(255,255,255,0.1)',
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

                      {/* CTA links */}
                      <div style={{ display: 'flex', gap: '0.65rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ fontSize: '0.78rem', padding: '0.45rem 1.1rem' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            GitHub
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '0.3rem' }}>
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
                            style={{ fontSize: '0.78rem', padding: '0.45rem 1.1rem' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live site
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '0.3rem' }}>
                              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expand/collapse indicator */}
                  <div
                    aria-hidden="true"
                    style={{
                      paddingTop: '0.35rem',
                      color: isOpen ? 'var(--muted-light)' : 'var(--muted)',
                      transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), color 0.25s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Footer */}
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
          More on{' '}
          <a
            href="https://github.com/kasbihari"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--sand)',
              borderBottom: '1px solid var(--sand-dark)',
              paddingBottom: '1px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            GitHub
          </a>
        </p>
      </div>

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}