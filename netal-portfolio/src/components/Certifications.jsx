const certs = [
  { icon: '🎓', name: 'Google Gemini Certified Student', issuer: 'Google for Education', date: 'May 2026 – May 2029', bg: '#CAED4C', text: '#0D0D0D' },
  { icon: '🏢', name: 'Advanced Software Engineering', issuer: 'Walmart Global Tech · Forage', date: '2025', bg: '#0D0D0D', text: '#fff' },
  { icon: '💼', name: 'Technology Job Simulation', issuer: 'Deloitte · Forage', date: '2025', bg: '#E8341A', text: '#fff' },
]

export default function Certifications() {
  return (
    <section id="certs" style={{ padding: '7rem 4rem', background: '#0D0D0D', color: '#fff' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CAED4C', marginBottom: '0.8rem' }}>Credentials</p>
      <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '3rem', color: '#fff' }}>Certifications</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {certs.map((c, i) => (
          <div key={i} className="reveal" style={{
            background: c.bg, color: c.text,
            borderRadius: 28, padding: '2.2rem',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) rotate(1deg)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{c.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>{c.name}</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.3rem', fontWeight: 600 }}>{c.issuer}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
