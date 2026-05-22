const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js',     level: 92 },
      { name: 'TypeScript',          level: 88 },
      { name: 'Tailwind CSS',        level: 90 },
      { name: 'Astro',               level: 80 },
      { name: 'Framer Motion',       level: 75 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express',   level: 88 },
      { name: 'Python / FastAPI',    level: 80 },
      { name: 'PostgreSQL',          level: 82 },
      { name: 'Redis',               level: 72 },
      { name: 'REST + GraphQL',      level: 85 },
    ],
  },
  {
    category: 'AI & Data',
    skills: [
      { name: 'OpenAI API',          level: 85 },
      { name: 'LangChain',           level: 72 },
      { name: 'Vector DBs',          level: 68 },
      { name: 'Data pipelines',      level: 76 },
      { name: 'Prompt engineering',  level: 82 },
    ],
  },
  {
    category: 'Infrastructure',
    skills: [
      { name: 'Docker',              level: 80 },
      { name: 'GitHub Actions',      level: 85 },
      { name: 'Vercel / Netlify',    level: 88 },
      { name: 'Linux / Shell',       level: 75 },
      { name: 'Prisma / Drizzle',    level: 78 },
    ],
  },
];

const tools = [
  'VS Code', 'Figma', 'Postman', 'Linear', 'Notion',
  'Git', 'Turborepo', 'pnpm', 'Zod', 'tRPC',
  'Stripe', 'Resend', 'Supabase', 'PlanetScale', 'Cloudflare',
];

const approaches = [
  {
    title: 'Architecture first',
    body: 'I design the data model and system boundaries before writing a single line of application code.',
  },
  {
    title: 'Typed end-to-end',
    body: 'TypeScript from database schema to UI component. No implicit any, no runtime surprises.',
  },
  {
    title: 'Ship, then improve',
    body: 'Working software beats perfect software. I get to production fast, then iterate with data.',
  },
  {
    title: 'DX as a feature',
    body: 'Good tooling, clear naming, and sensible defaults make every codebase easier to hand off.',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">

        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <p data-reveal className="section-label">
            Capabilities
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
            What I bring{' '}
            <span
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--sand-light)',
              }}
            >
              to the table.
            </span>
          </h2>
        </div>

        {/* Skill bars grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3.5rem',
            marginBottom: '5rem',
          }}
        >
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              data-reveal
              data-delay={`${gi * 80}`}
            >
              {/* Category label */}
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--sand)',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '1rem',
                    height: '1px',
                    background: 'var(--sand)',
                    opacity: 0.5,
                  }}
                />
                {group.category}
              </p>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--muted-light)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--muted)',
                          fontFamily: 'JetBrains Mono, monospace',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Track */}
                    <div
                      style={{
                        height: '2px',
                        background: 'var(--border-subtle)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Fill — CSS animation on scroll via data-reveal parent */}
                      <div
                        className="skill-bar-fill"
                        style={
                          {
                            height: '100%',
                            background: 'linear-gradient(to right, var(--sand-dark), var(--sand))',
                            borderRadius: '2px',
                            width: '0%',
                            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
                            '--target-width': `${skill.level}%`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Tools row */}
        <div style={{ padding: '3.5rem 0' }}>
          <p
            data-reveal
            style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1.75rem',
            }}
          >
            Tools & ecosystem
          </p>

          <div
            data-reveal
            data-delay="100"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}
          >
            {tools.map((tool) => (
              <span
                key={tool}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.4rem 0.9rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  color: 'var(--muted)',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s, border-color 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--muted-light)';
                  e.currentTarget.style.borderColor = 'var(--border-mid)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Engineering approach */}
        <div style={{ paddingTop: '3.5rem' }}>
          <p
            data-reveal
            style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '2.5rem',
            }}
          >
            Engineering approach
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {approaches.map((item, i) => (
              <div
                key={item.title}
                data-reveal
                data-delay={`${i * 80}`}
                style={{
                  padding: '1.75rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-mid)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--soft-white)',
                    marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}