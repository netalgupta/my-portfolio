export default function Contact() {
  return (
    <section id="contact" style={{ padding: '9rem 4rem', background: 'var(--cream)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes glitch1 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-5px)} }
        @keyframes glitch2 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
        .glitch-wrap { position: relative; display: inline-block; color: #E8341A; }
        .glitch-wrap:hover::before {
          content: attr(data-text); position: absolute; left: 0; top: 0;
          color: #CAED4C; animation: glitch1 0.35s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        .glitch-wrap:hover::after {
          content: attr(data-text); position: absolute; left: 0; top: 0;
          color: #FF6B4A; animation: glitch2 0.35s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        .social-link-btn { position: relative; overflow: hidden; }
        .social-link-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:#0D0D0D; transition:left 0.3s; z-index:0; }
        .social-link-btn:hover::before { left:0; }
        .social-link-btn span { position: relative; z-index: 1; }
        .social-link-btn:hover { color: #fff !important; border-color: #0D0D0D !important; }
      `}</style>

      {/* deco blobs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#E8341A', bottom: -200, left: -100, opacity: 0.06 }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#CAED4C', top: -80, right: 50, opacity: 0.1 }} />

      <p className="reveal" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '1.2rem' }}>Get In Touch</p>

      <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>
        Let&apos;s build<br />
        something{' '}
        <span className="glitch-wrap" data-text="great.">great.</span>
      </h2>

      <p className="reveal" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem', maxWidth: 500, margin: '0 auto 3rem' }}>
        Open to internships, collabs, hackathon teams, creative projects, and anything in between.
      </p>

      <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: '✉ netalgupta4815@gmail.com', href: 'mailto:netalgupta4815@gmail.com' },
          { label: '⌥ github.com/netalgupta', href: 'https://github.com/netalgupta' },
          { label: 'in linkedin.com/in/netalgupta', href: 'https://www.linkedin.com/in/netalgupta' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="social-link-btn"
            style={{
              display: 'inline-flex', alignItems: 'center',
              textDecoration: 'none', color: '#0D0D0D',
              fontWeight: 700, fontSize: '0.88rem',
              padding: '0.85rem 1.8rem',
              border: '1.5px solid rgba(0,0,0,0.15)',
              borderRadius: 100,
              transition: 'color 0.3s, border-color 0.3s',
            }}>
            <span>{l.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
