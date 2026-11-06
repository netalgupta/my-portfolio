const hacks = [
  { name: 'Indradhanu — International Grand Challenge', result: 'Round 1 cleared · Round 2 in January', project: 'Global challenge participation', bg: '#0D0D0D', text: '#fff', accent: '#CAED4C' },
  { name: 'Smart India Hackathon 2026 (National)', result: 'Finalist — PS26117 (MRPL)', project: 'Sovereign On-Premise Agentic AI Workbench', bg: '#6D28D9', text: '#fff', accent: '#CAED4C' },
  { name: 'Smart India Hackathon 2025', result: 'Reached Round 2', project: 'Innovation track participation', bg: '#E8341A', text: '#fff', accent: '#CAED4C' },
  { name: 'Smart India Hackathon 2026 (Internal Round)', result: 'Ranked 2nd out of ~150 teams', project: 'VARUNA', bg: '#0D0D0D', text: '#fff', accent: '#CAED4C' },
  { name: 'AfterMath Hackathon', result: 'Top 12 finalist of 36/250+ teams', project: 'SaathiCare', bg: '#FF8C42', text: '#fff', accent: '#CAED4C' },
  { name: 'Nexathon', result: 'Top 6', project: 'HackTrack — facial recognition + geo-fencing', bg: '#CAED4C', text: '#0D0D0D', accent: '#E8341A' },
  { name: 'GDG Hackathon', result: 'Top 6', project: 'AI Competitive Programming Tracker', bg: '#0D0D0D', text: '#fff', accent: '#fff' },
]

export default function Hackathons() {
  return (
    <section id="hackathons" style={{ padding: '7rem 4rem', background: '#E8341A', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .hack-card:hover { transform: translateY(-6px) !important; }
      `}</style>

      {/* deco blobs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', top: -100, right: -80 }} />
      <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', bottom: -60, left: 60 }} />

      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CAED4C', marginBottom: '0.8rem' }}>Battle Record</p>
      <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '3.5rem', color: '#fff' }}>
        Hackathon Wins
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', paddingLeft: '1.5rem' }}>
        {hacks.map((h, i) => (
          <div key={i} className="hack-card reveal" style={{
            background: h.bg, color: h.text,
            borderRadius: 28, padding: '2.2rem',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'default',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', opacity: 0.65, marginBottom: '1rem' }}>ENTRY {String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>{h.name}</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: h.accent, marginBottom: '0.5rem' }}>{h.result}</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.75 }}>{h.project}</div>
          </div>
        ))}
      </div>
      
    </section>
  )
}
