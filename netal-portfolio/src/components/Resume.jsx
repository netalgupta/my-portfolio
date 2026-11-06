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
            Add your resume PDF as <code>resume.pdf</code> in the public folder to make it available here.
          </p>
        </div>
        <button
          type="button"
          disabled
          aria-label="Resume PDF will be available after adding public/resume.pdf"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.85rem 1.5rem', borderRadius: 100,
            border: 'none', background: '#0D0D0D', color: '#fff',
            fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap',
            opacity: 0.6, cursor: 'not-allowed',
          }}
        >
          Resume PDF coming soon
        </button>
      </div>
    </section>
  )
}
