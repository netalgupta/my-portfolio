import { useState, useEffect, useRef } from 'react'

const allSkills = [
  { name: 'PYTHON', cat: 'Languages', size: 'xl', color: '#CAED4C', text: '#0D0D0D' },
  { name: 'JAVASCRIPT', cat: 'Languages', size: 'lg', color: '#FF8C42', text: '#fff' },
  { name: 'JAVA', cat: 'Languages', size: 'md', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'C', cat: 'Languages', size: 'sm', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'HTML/CSS', cat: 'Languages', size: 'md', color: '#E8341A', text: '#fff' },
  { name: 'SQL', cat: 'Languages', size: 'sm', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'GEMINI API', cat: 'AI / ML', size: 'xl', color: '#E8341A', text: '#fff' },
  { name: 'LLM INTEGRATION', cat: 'AI / ML', size: 'lg', color: '#0D0D0D', text: '#fff' },
  { name: 'PROMPT ENGINEERING', cat: 'AI / ML', size: 'md', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'WEB SPEECH API', cat: 'AI / ML', size: 'md', color: '#FF8C42', text: '#fff' },
  { name: 'FACE RECOGNITION', cat: 'AI / ML', size: 'md', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'NUMPY', cat: 'AI / ML', size: 'sm', color: '#e8f5e9', text: '#2E7D32', border: '1.5px dashed #A5D6A7', learning: true },
  { name: 'PANDAS', cat: 'AI / ML', size: 'sm', color: '#e8f5e9', text: '#2E7D32', border: '1.5px dashed #A5D6A7', learning: true },
  { name: 'NEXT.JS', cat: 'Frameworks', size: 'xl', color: '#0D0D0D', text: '#CAED4C' },
  { name: 'REACT', cat: 'Frameworks', size: 'lg', color: '#CAED4C', text: '#0D0D0D' },
  { name: 'NODE.JS', cat: 'Frameworks', size: 'md', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'FIREBASE', cat: 'Frameworks', size: 'md', color: '#FF8C42', text: '#fff' },
  { name: 'FLUTTER', cat: 'Frameworks', size: 'sm', color: '#e8f5e9', text: '#2E7D32', border: '1.5px dashed #A5D6A7', learning: true },
  { name: 'FASTAPI', cat: 'Frameworks', size: 'sm', color: '#e8f5e9', text: '#2E7D32', border: '1.5px dashed #A5D6A7', learning: true },
  { name: 'FIGMA', cat: 'Design', size: 'lg', color: '#E8341A', text: '#fff' },
  { name: 'CANVA', cat: 'Design', size: 'md', color: '#C084FC', text: '#fff' },
  { name: 'ADOBE PHOTOSHOP', cat: 'Design', size: 'md', color: '#0D0D0D', text: '#fff' },
  { name: 'ADOBE PRO', cat: 'Design', size: 'sm', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'POSTGRESQL', cat: 'Tools', size: 'md', color: '#CAED4C', text: '#0D0D0D' },
  { name: 'GITHUB', cat: 'Tools', size: 'md', color: '#0D0D0D', text: '#fff' },
  { name: 'VERCEL', cat: 'Tools', size: 'sm', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
  { name: 'MYSQL', cat: 'Tools', size: 'sm', color: '#FF8C42', text: '#fff' },
  { name: 'VS CODE', cat: 'Tools', size: 'sm', color: '#FAF7F2', text: '#0D0D0D', border: '1.5px solid #ddd' },
]

const CATS = ['ALL', 'Languages', 'AI / ML', 'Frameworks', 'Design', 'Tools']

const sizeMap = { xl: { fontSize: '1rem', padding: '0.7rem 1.5rem' }, lg: { fontSize: '0.9rem', padding: '0.6rem 1.3rem' }, md: { fontSize: '0.8rem', padding: '0.5rem 1.1rem' }, sm: { fontSize: '0.72rem', padding: '0.4rem 0.9rem' } }

export default function Skills() {
  const [active, setActive] = useState('ALL')
  const [bubbles, setBubbles] = useState([])
  const containerRef = useRef(null)
  const animRef = useRef(null)
  const bubblesRef = useRef([])

  const filtered = active === 'ALL' ? allSkills : allSkills.filter(s => s.cat === active)

  useEffect(() => {
    const W = containerRef.current?.offsetWidth || 800
    const H = 420
    const newBubbles = filtered.map((s, i) => {
      const sz = sizeMap[s.size]
      const w = s.name.length * (s.size === 'xl' ? 13 : s.size === 'lg' ? 11 : 9) + 40
      const h = 44
      return {
        ...s, id: i, w, h,
        x: Math.random() * (W - w),
        y: Math.random() * (H - h),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        sz,
      }
    })
    bubblesRef.current = newBubbles
    setBubbles([...newBubbles])

    const animate = () => {
      const W2 = containerRef.current?.offsetWidth || 800
      bubblesRef.current = bubblesRef.current.map(b => {
        let { x, y, vx, vy, w, h } = b
        x += vx; y += vy
        if (x < 0) { x = 0; vx = Math.abs(vx) }
        if (x + w > W2) { x = W2 - w; vx = -Math.abs(vx) }
        if (y < 0) { y = 0; vy = Math.abs(vy) }
        if (y + h > H) { y = H - h; vy = -Math.abs(vy) }
        return { ...b, x, y, vx, vy }
      })
      setBubbles([...bubblesRef.current])
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  return (
    <section id="skills" style={{ padding: '7rem 4rem', background: '#0D0D0D', color: '#fff' }}>
      <style>{`
        .skill-bubble { cursor: default; transition: transform 0.2s, box-shadow 0.2s !important; }
        .skill-bubble:hover { transform: scale(1.12) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.25) !important; z-index: 10; }
        .filter-btn { cursor: pointer; transition: all 0.2s; border: none; font-family: 'Space Grotesk', sans-serif; }
        .filter-btn:hover { transform: scale(1.05); }
      `}</style>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CAED4C', marginBottom: '0.8rem' }}>What I Work With</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          The Toolkit.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', maxWidth: 220, lineHeight: 1.6, alignSelf: 'flex-end' }}>
          From AI APIs to design tools. Hover the badges — they react.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button key={c} className="filter-btn" onClick={() => setActive(c)} style={{
            padding: '0.4rem 1.1rem', borderRadius: 100,
            background: active === c ? '#E8341A' : 'transparent',
            color: active === c ? '#fff' : 'rgba(255,255,255,0.55)',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            border: active === c ? 'none' : '1px solid rgba(255,255,255,0.15)',
          }}>{c}</button>
        ))}
      </div>

      {/* Floating bubble canvas */}
      <div ref={containerRef} style={{ position: 'relative', height: 420, overflow: 'hidden', borderRadius: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {bubbles.map(b => (
          <div key={`${b.id}-${b.name}`} className="skill-bubble" style={{
            position: 'absolute',
            left: b.x, top: b.y,
            background: b.color,
            color: b.text,
            border: b.border || 'none',
            padding: b.sz.padding,
            borderRadius: 100,
            fontSize: b.sz.fontSize,
            fontWeight: 800,
            letterSpacing: '0.05em',
            fontFamily: "'Space Mono', monospace",
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            userSelect: 'none',
          }}>
            {b.name}
            {b.learning && <span style={{ marginLeft: 6, fontSize: '0.62rem', background: 'rgba(46,125,50,0.2)', color: '#4CAF50', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>LEARNING</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
