import { useEffect, useState, useCallback } from 'react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection('#' + entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) closeMenu(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeMenu]);

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
          transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s',
          background: scrolled
            ? 'rgba(10,10,10,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-name)',
            fontSize: '1.6rem',
            color: 'var(--soft-white)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            transition: 'color 0.3s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
        >
          KB
        </a>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  color: isActive ? 'var(--soft-white)' : 'var(--muted-light)',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive
                    ? 'var(--soft-white)'
                    : 'var(--muted-light)';
                }}
              >
                {link.label}
                {/* Active underline */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'var(--sand)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </a>
            );
          })}

          <a
            href="#contact"
            className="btn-primary"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
          >
            Let's talk
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0',
            padding: '4px',
            position: 'relative',
          }}
        >
          {/* Animated lines → X */}
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--soft-white)',
              position: 'absolute',
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s',
              transform: menuOpen ? 'rotate(45deg) translateY(0)' : 'translateY(-5px)',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--soft-white)',
              position: 'absolute',
              transition: 'opacity 0.2s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--soft-white)',
              position: 'absolute',
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s',
              transform: menuOpen ? 'rotate(-45deg) translateY(0)' : 'translateY(5px)',
            }}
          />
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 'clamp(1.5rem, 8vw, 3rem)',
          transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), visibility 0.45s',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Decorative label */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--sand)',
            marginBottom: '2.5rem',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s 0.1s, transform 0.4s 0.1s',
          }}
        >
          Navigation
        </div>

        {/* Nav items */}
        <nav style={{ width: '100%' }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 10vw, 4rem)',
                fontWeight: 400,
                color: activeSection === link.href ? 'var(--sand)' : 'var(--soft-white)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                paddingBottom: '0.5rem',
                marginBottom: '0.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-24px)',
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.07}s, color 0.3s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  activeSection === link.href ? 'var(--sand)' : 'var(--soft-white)';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.5s 0.42s, transform 0.5s 0.42s`,
          }}
        >
          <a href="#contact" onClick={closeMenu} className="btn-primary">
            Let's talk
          </a>
          <a href="/CV-Krishna-Bihari.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
            Download CV
          </a>
        </div>

        {/* Social links bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 5vw, 2.5rem)',
            left: 'clamp(1.5rem, 8vw, 3rem)',
            display: 'flex',
            gap: '1.5rem',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.5s 0.5s',
          }}
        >
          {[
            { label: 'GitHub', href: 'https://github.com/kasbihari' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/krishnabihari' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                color: 'var(--muted-light)',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-light)')}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}