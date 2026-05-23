import { useEffect, useState, useCallback } from 'react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const hero = document.getElementById('home');

    const onScroll = () => {
      const heroH = hero?.offsetHeight ?? window.innerHeight;
      setPastHero(window.scrollY > heroH * 0.75);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection('#' + e.target.id);
        }),
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) closeMenu(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeMenu]);

  return (
    <>
      {/* ── Scroll progress line ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--sand-dark), var(--sand-light))',
          zIndex: 1001,
          transition: 'width 0.08s linear',
          opacity: pastHero ? 1 : 0,
        }}
      />

      {/* ── Hero name — fades out when past hero ── */}
      <div
        aria-hidden={pastHero}
        style={{
          position: 'fixed',
          top: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          pointerEvents: pastHero ? 'none' : 'auto',
          opacity: pastHero ? 0 : 1,
          transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
          whiteSpace: 'nowrap',
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: 'var(--font-name)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--soft-white)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          Krishna Bihari
        </a>
      </div>

      {/* ── Desktop pill nav — appears after hero ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: pastHero ? '1.5rem' : '-5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '5px 6px',
          background: 'rgba(12,12,12,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '100px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
          opacity: pastHero ? 1 : 0,
          pointerEvents: pastHero ? 'auto' : 'none',
          transition: 'top 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
          whiteSpace: 'nowrap',
        }}
        className="pill-nav"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                position: 'relative',
                padding: '7px 16px',
                fontSize: '0.78rem',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.03em',
                color: isActive ? 'var(--soft-white)' : 'rgba(255,255,255,0.42)',
                textDecoration: 'none',
                borderRadius: '100px',
                background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
                border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.42)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {link.label}
              {isActive && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: 'var(--sand-light)',
                  }}
                />
              )}
            </a>
          );
        })}

        <div
          aria-hidden="true"
          style={{
            width: '1px',
            height: '16px',
            background: 'rgba(255,255,255,0.1)',
            margin: '0 4px',
            flexShrink: 0,
          }}
        />

        <a
          href="#contact"
          style={{
            padding: '7px 18px',
            fontSize: '0.76rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: '#111',
            background: 'var(--sand-light)',
            textDecoration: 'none',
            borderRadius: '100px',
            flexShrink: 0,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
            e.currentTarget.style.transform = 'scale(0.97)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Let's talk
        </a>
      </nav>

      {/* ── Mobile: single LEFT hamburger ── */}
      <button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="hamburger-btn"
        style={{
          position: 'fixed',
          top: '1.1rem',
          left: '1.25rem',
          zIndex: 1000,
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
          width: '42px',
          height: '42px',
          background: 'rgba(12,12,12,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          cursor: 'pointer',
          padding: '10px',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '18px',
              height: '1.5px',
              background: 'var(--soft-white)',
              borderRadius: '2px',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              transform:
                i === 0 && menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)'
                : i === 2 && menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                : 'none',
              opacity: i === 1 && menuOpen ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* ── Mobile dropdown ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="mobile-menu"
        style={{
          position: 'fixed',
          top: '4.5rem',
          left: '1rem',
          right: '1rem',
          zIndex: 999,
          background: 'rgba(10,10,10,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          overflow: 'hidden',
          maxHeight: menuOpen ? '460px' : '0px',
          padding: menuOpen ? '0.75rem' : '0 0.75rem',
          transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), padding 0.3s ease',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          display: 'none',
        }}
      >
        {navLinks.map((link, i) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--soft-white)' : 'rgba(255,255,255,0.48)',
                textDecoration: 'none',
                borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                letterSpacing: '0.02em',
              }}
            >
              {link.label}
              {isActive && (
                <span style={{
                  fontSize: '0.62rem',
                  color: 'var(--sand-light)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                }}>
                  Now
                </span>
              )}
            </a>
          );
        })}
        <a
          href="#contact"
          onClick={closeMenu}
          style={{
            display: 'block',
            marginTop: '0.75rem',
            padding: '0.9rem',
            textAlign: 'center',
            fontSize: '0.83rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: '#111',
            background: 'var(--sand-light)',
            textDecoration: 'none',
            borderRadius: '10px',
          }}
        >
          Let's talk
        </a>
      </div>

      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          style={{ position: 'fixed', inset: 0, zIndex: 998 }}
        />
      )}

      <style>{`
        @media (max-width: 720px) {
          .pill-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </>
  );
}