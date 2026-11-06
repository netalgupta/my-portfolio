const certs = [
  { mark: 'G', name: 'Google Gemini Certified Student', issuer: 'Google for Education', date: 'May 2026 – May 2029', bg: '#CAED4C', text: '#0D0D0D' },
  { mark: 'W', name: 'Walmart Global Tech Advanced Software Engineering', issuer: 'Forage · Python ETL pipelines, data structures, UML/ERD', date: '2025', bg: '#1A1A1A', text: '#fff', border: '1.5px solid rgba(255,255,255,0.12)' },
  { mark: 'D', name: 'Deloitte Technology Job Simulation', issuer: 'Forage · Telemetry data, system design, software proposals', date: '2025', bg: '#E8341A', text: '#fff' },
]

export default function Certifications() {
  return (
    <section id="certs" style={{ padding: '7rem 4rem', background: '#F7F2EB', color: '#0D0D0D', borderTop: '1px solid rgba(13,13,13,0.08)', borderBottom: '1px solid rgba(13,13,13,0.08)' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.8rem' }}>Credentials</p>
      <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '3rem', color: '#0D0D0D' }}>Certifications</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {certs.map((c, i) => (
          <div key={i} className="reveal" style={{
            background: c.bg, color: c.text,
            borderRadius: 28, padding: '2.2rem',
            border: c.border || '1px solid rgba(13,13,13,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) rotate(1deg)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', marginBottom: '1rem', opacity: 0.75 }}>{c.mark}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>{c.name}</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.3rem', fontWeight: 600 }}>{c.issuer}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
