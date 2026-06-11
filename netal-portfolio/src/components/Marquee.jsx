export default function Marquee() {
  const items = ['Developer ✦', 'AI Builder ✦', 'Creative Director ✦', 'Hackathon Finalist ✦',
    'Marketer ✦', 'Next.js ✦', 'Python ✦', 'Gemini API ✦', 'Flutter ✦']
  const doubled = [...items, ...items]

  return (
    <div style={{ background: '#0D0D0D', padding: '1rem 0', overflow: 'hidden' }}>
      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-inner { display:flex; gap:3rem; animation:marquee 20s linear infinite; white-space:nowrap; }
      `}</style>
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} style={{ color: '#CAED4C', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
