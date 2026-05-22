const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        borderTop:  '1px solid rgba(255,255,255,0.07)',
        padding:    '3rem 2rem',
        background: 'transparent',
      }}
    >
      <div
        style={{
          maxWidth:       '1100px',
          margin:         '0 auto',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '1.5rem',
          textAlign:      'center',
        }}
      >
        {/* Name */}
        <span
          style={{
            fontFamily:    'AmsterdamFour, serif',
            fontSize:      '2rem',
            color:         'var(--soft-white)',
            letterSpacing: '0.02em',
            lineHeight:    1,
          }}
        >
          Krishna Bihari
        </span> <br></br>

        {/* Tagline */}
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--muted)',
          }}
        >
          Full-Stack & AI Engineer · Amsterdam
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/kasbihari'          },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/krishnabihari'  },
            { label: 'CV',       href: '/CV-Krishna.pdf'                        },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize:       '0.75rem',
                letterSpacing:  '0.1em',
                textTransform:  'uppercase',
                fontFamily:     'var(--font-body)',
                color:          'var(--muted)',
                textDecoration: 'none',
                transition:     'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.7rem',
            color:      'var(--muted)',
            letterSpacing: '0.06em',
          }}
        >
          © {year} Krishna Bihari — Built with Astro & TypeScript
        </p>
      </div>
    </footer>
  );
}