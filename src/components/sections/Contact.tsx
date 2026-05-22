import { useState } from 'react';

const contactLinks = [
  {
    label: 'GitHub',
    value: 'github.com/kasbihari',
    href: 'https://github.com/kasbihari',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/krishnabihari',
    href: 'https://linkedin.com/in/krishnabihari',
  },
  {
    label: 'Email',
    value: 'krishna@example.com',
    href: 'mailto:krishna@example.com',
  },
];

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState<FormState>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Replace with your actual form endpoint (Formspree, Resend, etc.)
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-main">

        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <p data-reveal className="section-label">
            Contact
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
              maxWidth: '560px',
            }}
          >
            Let's build something{' '}
            <span
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--sand-light)',
              }}
            >
              worth shipping.
            </span>
          </h2>

          <p
            data-reveal
            data-delay="200"
            style={{
              marginTop: '1.5rem',
              fontSize: '0.95rem',
              color: 'var(--muted)',
              lineHeight: 1.75,
              maxWidth: '420px',
            }}
          >
            Open to freelance projects, long-term collaborations, and
            interesting engineering challenges. Response within 24 hours.
          </p>
        </div>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '5rem',
            alignItems: 'start',
          }}
        >

          {/* Left — contact links */}
          <div data-reveal data-delay="0">
            <p
              style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '2rem',
              }}
            >
              Find me at
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {contactLinks.map((link) => (
                <div key={link.label}>
                  <div className="divider" />
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.25rem 0',
                      color: 'var(--muted-light)',
                      transition: 'color 0.3s cubic-bezier(0.16,1,0.3,1)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--soft-white)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--muted-light)';
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.72rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--muted)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {link.label}
                      </span>
                      <span style={{ fontSize: '0.9rem' }}>{link.value}</span>
                    </div>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ opacity: 0.4, flexShrink: 0 }}
                    >
                      <path
                        d="M3 13L13 3M13 3H6M13 3v7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              ))}
              <div className="divider" />
            </div>

            {/* Availability badge */}
            <div
              style={{
                marginTop: '2.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1.1rem',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--forest-bright)',
                  boxShadow: '0 0 6px var(--forest-bright)',
                }}
              />
              <span
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--muted-light)',
                  letterSpacing: '0.04em',
                }}
              >
                Available for new projects
              </span>
            </div>
          </div>

          {/* Right — contact form */}
          <div data-reveal data-delay="150">
            {status === 'sent' ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: 'var(--soft-white)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Message received.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--charcoal-2)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      color: 'var(--soft-white)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--charcoal-2)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      color: 'var(--soft-white)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--charcoal-2)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      color: 'var(--soft-white)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: '0.82rem', color: '#e07070' }}>
                    Something went wrong — try emailing me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: status === 'sending' ? 0.6 : 1,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                  {status !== 'sending' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}