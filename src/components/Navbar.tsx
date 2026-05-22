import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Work',    href: '#projects' },
  { label: 'About',   href: '#about'    },
  { label: 'Skills',  href: '#skills'   },
  { label: 'Contact', href: '#contact'  },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen,     setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s cubic-bezier(0.16,1,0.3,1)',
          background: scrolled
            ? 'rgba(10,10,10,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border-subtle)'
            : '1px solid transparent',
        }}
      >
        <div
          className="container-main"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'var(--soft-white)',
              letterSpacing: '-0.01em',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
          >
            KB
          </a>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: activeSection === link.href
                    ? 'var(--soft-white)'
                    : 'var(--muted)',
                  transition: 'color 0.3s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    activeSection === link.href ? 'var(--soft-white)' : 'var(--muted)';
                }}
              >
                {link.label}
                {/* Active underline */}
                {activeSection === link.href && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--sand)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
          >
            Let's talk
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1px',
                  background: 'var(--soft-white)',
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'translateY(6px) rotate(45deg)'
                        : i === 2
                        ? 'translateY(-6px) rotate(-45deg)'
                        : 'scaleX(0)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-16px)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 'clamp(1.8rem, 8vw, 3rem)',
              fontWeight: 500,
              color: 'var(--soft-white)',
              letterSpacing: '-0.02em',
              transition: 'color 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
          >
            {link.label}
          </a>
        ))}

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Let's talk
        </a>
      </div>
    </>
  );
}