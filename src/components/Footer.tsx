const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
      }}
    >
      <div
        className="container-main"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left */}
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--muted)',
            letterSpacing: '0.04em',
          }}
        >
          © {year} Krishna Bihari — Built with Astro & TypeScript
        </p>

        {/* Right — quick links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/kasbihari'          },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/krishnabihari' },
            { label: 'CV',       href: '/CV-Krishna.pdf'                        },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('/') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}