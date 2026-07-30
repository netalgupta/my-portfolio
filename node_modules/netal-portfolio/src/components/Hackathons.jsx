const hacks = [
  { trophy: '🏆', name: 'AfterMath Hackathon', result: 'Top 12 from 36/250+ Teams', project: 'SaathiCare · Team Lead', bg: '#E8341A', text: '#fff', accent: '#CAED4C' },
  { trophy: '🥇', name: 'Nexathon', result: 'Top 6', project: 'HackTrack — Face Rec + Geo-fence', bg: '#CAED4C', text: '#0D0D0D', accent: '#E8341A' },
  { trophy: '�', name: 'Smart India Hackathon', result: 'Advanced to Round 2', project: 'National Level · AI-driven solution', bg: '#0D0D0D', text: '#fff', accent: '#CAED4C' },
  { trophy: '🤖', name: 'GDG Hackathon', result: 'Built & Presented', project: 'AI CP Tracker · LLM code eval', bg: '#FF8C42', text: '#fff', accent: '#fff' },
]

export default function Hackathons() {
  return (
    <section id="hackathons" style={{ padding: '7rem 4rem', background: '#E8341A', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes trophySpin { 0%,100%{transform:rotate(-8deg) scale(1)} 50%{transform:rotate(8deg) scale(1.1)} }
        .hack-card:hover .trophy-icon { animation: trophySpin 0.6s ease infinite !important; }
        .hack-card:hover { transform: translateY(-10px) rotate(-1deg) !important; }
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
            <div className="trophy-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'inline-block' }}>{h.trophy}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>{h.name}</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: h.accent, marginBottom: '0.5rem' }}>{h.result}</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.75 }}>{h.project}</div>
          </div>
        ))}
      </div>
      
    </section>
  )
}
