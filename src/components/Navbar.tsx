import { useEffect, useState, useCallback } from 'react';

const navLinks = [
  { label: 'Work',    href: '#projects' },
  { label: 'About',   href: '#about'    },
  { label: 'Skills',  href: '#skills'   },
  { label: 'Contact', href: '#contact'  },
];

const NAV_H = 80;

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
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
      {/* ── Floating name ── */}
      <a
        href={menuOpen ? undefined : '#'}
        style={{
          position:       'fixed',
          zIndex:         200,
          left:           '50%',
          top:            menuOpen ? '20vh' : `${NAV_H / 2}px`,
          transform:      'translate(-50%, -50%)',
          fontFamily:     'AmsterdamFour, serif',
          fontSize:       menuOpen ? '2.8rem' : '1.75rem',
          color:          menuOpen ? 'var(--sand)' : 'var(--soft-white)',
          textDecoration: 'none',
          letterSpacing:  '0.02em',
          lineHeight:     1,
          whiteSpace:     'nowrap',
          cursor:         menuOpen ? 'default' : 'pointer',
          pointerEvents:  menuOpen ? 'none' : 'auto',
          textShadow:     menuOpen
            ? '0 0 40px rgba(212,183,141,0.25)'
            : '0 2px 12px rgba(0,0,0,0.5)',
          transition: [
            'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            'font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            'color 0.45s ease',
            'text-shadow 0.45s ease',
          ].join(', '),
        }}
      >
        Krishna Bihari
      </a>

      {/* ── Nav bar ── */}
      <nav
        style={{
          position:       'fixed',
          top: 0, left: 0, right: 0,
          zIndex:         100,
          height:         `${NAV_H}px`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 2.5rem',
          transition:     'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          background:     scrolled || menuOpen ? 'rgba(12,12,12,0.92)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(18px) saturate(1.4)' : 'none',
          borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          boxShadow:      scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* LEFT — desktop links */}
        <div className="hidden md:flex" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.slice(0, 2).map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize:       '0.75rem',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     500,
                  letterSpacing:  '0.14em',
                  textTransform:  'uppercase',
                  textDecoration: 'none',
                  color:          isActive ? 'var(--soft-white)' : 'var(--muted-light)',
                  paddingBottom:  '4px',
                  borderBottom:   isActive ? '1px solid var(--sand)' : '1px solid transparent',
                  transition:     'color 0.25s, border-color 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--soft-white)' : 'var(--muted-light)')}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* RIGHT — desktop links + CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="hidden md:flex" style={{ gap: '2.5rem', alignItems: 'center', marginRight: '1.5rem' }}>
            {navLinks.slice(2).map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize:       '0.75rem',
                    fontFamily:     'var(--font-body)',
                    fontWeight:     500,
                    letterSpacing:  '0.14em',
                    textTransform:  'uppercase',
                    textDecoration: 'none',
                    color:          isActive ? 'var(--soft-white)' : 'var(--muted-light)',
                    paddingBottom:  '4px',
                    borderBottom:   isActive ? '1px solid var(--sand)' : '1px solid transparent',
                    transition:     'color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soft-white)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--soft-white)' : 'var(--muted-light)')}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex"
            style={{
              fontSize:       '0.72rem',
              letterSpacing:  '0.12em',
              textTransform:  'uppercase',
              fontFamily:     'var(--font-body)',
              fontWeight:     500,
              color:          'var(--forest-green)',
              border:         '1px solid var(--forest-green)',
              borderRadius:   '2px',
              padding:        '8px 20px',
              textDecoration: 'none',
              transition:     'background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background  = 'var(--forest-green)';
              el.style.color       = '#fff';
              el.style.boxShadow   = '0 4px 20px rgba(74,111,80,0.35)';
              el.style.transform   = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background  = 'transparent';
              el.style.color       = 'var(--forest-green)';
              el.style.boxShadow   = 'none';
              el.style.transform   = 'translateY(0)';
            }}
          >
            Let's talk
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden"
            style={{
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              width:          '36px',
              height:         '36px',
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              alignItems:     'center',
              gap:            '6px',
              padding:        '4px',
              position:       'relative',
              zIndex:         201,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display:         'block',
                  width:           '22px',
                  height:          '1.5px',
                  background:      'var(--soft-white)',
                  borderRadius:    '2px',
                  transformOrigin: 'center',
                  transition:      'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7.5px) rotate(-45deg)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         99,
          background:     'rgba(8,8,8,0.97)',
          backdropFilter: 'blur(20px) saturate(1.2)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          paddingTop:     '6rem',
          gap:            '0',
          opacity:        menuOpen ? 1 : 0,
          pointerEvents:  menuOpen ? 'auto' : 'none',
          transition:     'opacity 0.4s ease',
        }}
      >
        {/* Divider under name */}
        <div
          style={{
            width:        '40px',
            height:       '1px',
            background:   'rgba(212,183,141,0.3)',
            marginBottom: '3.5rem',
            opacity:      menuOpen ? 1 : 0,
            transition:   'opacity 0.5s ease 0.2s',
          }}
        />

        {/* Nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.2rem', marginBottom: '3.5rem' }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                fontSize:       '1.75rem',
                fontFamily:     'var(--font-display)',
                fontStyle:      'italic',
                color:          activeSection === link.href ? 'var(--sand)' : 'var(--soft-white)',
                textDecoration: 'none',
                opacity:        menuOpen ? 1 : 0,
                transform:      menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: [
                  `opacity 0.45s ease ${0.09 * i + 0.22}s`,
                  `transform 0.45s cubic-bezier(0.4,0,0.2,1) ${0.09 * i + 0.22}s`,
                  'color 0.2s',
                  'text-shadow 0.2s',
                ].join(', '),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color      = 'var(--sand)';
                e.currentTarget.style.textShadow = '0 0 30px rgba(212,183,141,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color      = activeSection === link.href ? 'var(--sand)' : 'var(--soft-white)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={closeMenu}
          style={{
            fontSize:       '0.78rem',
            letterSpacing:  '0.14em',
            textTransform:  'uppercase',
            fontFamily:     'var(--font-body)',
            fontWeight:     500,
            color:          'var(--forest-green)',
            border:         '1px solid var(--forest-green)',
            borderRadius:   '2px',
            padding:        '11px 32px',
            textDecoration: 'none',
            marginBottom:   '2.5rem',
            opacity:        menuOpen ? 1 : 0,
            transform:      menuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition:     'opacity 0.45s ease 0.55s, transform 0.45s ease 0.55s, background 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'var(--forest-green)';
            el.style.color      = '#fff';
            el.style.boxShadow  = '0 4px 24px rgba(74,111,80,0.4)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'transparent';
            el.style.color      = 'var(--forest-green)';
            el.style.boxShadow  = 'none';
          }}
        >
          Let's talk
        </a>

        {/* Social */}
        <div
          style={{
            display:   'flex',
            gap:       '2.5rem',
            opacity:   menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition:'opacity 0.45s ease 0.63s, transform 0.45s ease 0.63s',
          }}
        >
          {[
            { label: 'GitHub',   href: 'https://github.com/kasbihari'          },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/krishnabihari'  },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize:       '0.72rem',
                letterSpacing:  '0.12em',
                textTransform:  'uppercase',
                fontFamily:     'var(--font-body)',
                color:          'var(--muted-light)',
                textDecoration: 'none',
                transition:     'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sand)')}
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