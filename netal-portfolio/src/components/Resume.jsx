export default function Resume() {
  return (
    <section id="resume" style={{ padding: '6rem 4rem', background: 'var(--cream)' }}>
      <div style={{
        maxWidth: 900, margin: '0 auto', padding: '2.5rem',
        border: '1px solid rgba(13,13,13,0.12)', borderRadius: 28,
        background: '#fff', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.8rem' }}>Resume</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '0.8rem' }}>My experience, at a glance.</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 560 }}>
            Access is managed through Google Drive. Please request access if you have not been invited.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="https://drive.google.com/file/d/1QINg2-_8FCTfdItydWyv29MCH5qONVBg/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.85rem 1.5rem', borderRadius: 100,
              background: '#0D0D0D', color: '#fff', textDecoration: 'none',
              fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap',
            }}
          >
            Open Resume in Google Drive
          </a>
        </div>
      </div>
    </section>
  )
}
