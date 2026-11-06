import { useEffect, useRef, useState } from 'react'

const allSkills = [
  { name: 'PYTHON', cat: 'Languages', color: 'lime' },
  { name: 'JAVASCRIPT', cat: 'Languages', color: 'orange' },
  { name: 'JAVA', cat: 'Languages', color: 'cream' },
  { name: 'C', cat: 'Languages', color: 'cream' },
  { name: 'HTML/CSS', cat: 'Languages', color: 'red' },
  { name: 'SQL', cat: 'Languages', color: 'cream' },
  { name: 'TYPESCRIPT', cat: 'Languages', color: 'mint' },
  { name: 'DART', cat: 'Languages', color: 'mint' },
  { name: 'GEMINI', cat: 'AI / ML', color: 'red' },
  { name: 'LLM INTEGRATION', cat: 'AI / ML', color: 'black' },
  { name: 'PROMPT ENGINEERING', cat: 'AI / ML', color: 'cream' },
  { name: 'WEB SPEECH API', cat: 'AI / ML', color: 'orange' },
  { name: 'FACE RECOGNITION', cat: 'AI / ML', color: 'cream' },
  { name: 'NUMPY', cat: 'AI / ML', color: 'mint' },
  { name: 'PANDAS', cat: 'AI / ML', color: 'mint' },
  { name: 'FAISS / RAG', cat: 'AI / ML', color: 'cream' },
  { name: 'OLLAMA', cat: 'AI / ML', color: 'cream' },
  { name: 'NEXT.JS', cat: 'Frameworks', color: 'blackLime' },
  { name: 'REACT', cat: 'Frameworks', color: 'lime' },
  { name: 'NODE.JS', cat: 'Frameworks', color: 'cream' },
  { name: 'FIREBASE', cat: 'Frameworks', color: 'orange' },
  { name: 'FASTAPI', cat: 'Frameworks', color: 'teal' },
  { name: 'TAILWIND CSS', cat: 'Frameworks', color: 'blue' },
  { name: 'FLUTTER', cat: 'Frameworks', color: 'mint' },
  { name: 'LANGGRAPH', cat: 'Frameworks', color: 'mint' },
  { name: 'HIGGSFIELD', cat: 'Editing', color: 'blackLime' },
  { name: 'CAPCUT', cat: 'Editing', color: 'black' },
  { name: 'INSTAGRAM EDITS', cat: 'Editing', color: 'lilac' },
  { name: 'CANVA', cat: 'Editing', color: 'lilac' },
  { name: 'ADOBE PHOTOSHOP', cat: 'Editing', color: 'black' },
  { name: 'ADOBE PREMIERE PRO', cat: 'Editing', color: 'lilac' },
  { name: 'DAVINCI RESOLVE', cat: 'Editing', color: 'black' },
  { name: 'POSTGRESQL', cat: 'Tools', color: 'lime' },
  { name: 'GITHUB', cat: 'Tools', color: 'black' },
  { name: 'NEO4J', cat: 'Tools', color: 'blue' },
  { name: 'DOCKER', cat: 'Tools', color: 'blue' },
  { name: 'DECK.GL', cat: 'Tools', color: 'cream' },
  { name: 'VERCEL', cat: 'Tools', color: 'cream' },
  { name: 'MYSQL', cat: 'Tools', color: 'orange' },
  { name: 'VS CODE', cat: 'Tools', color: 'cream' },
  { name: 'FIGMA', cat: 'Tools', color: 'red' },
]

const CATS = ['ALL', 'Languages', 'AI / ML', 'Frameworks', 'Editing', 'Tools']
const colors = {
  lime: { background: '#CAED4C', color: '#0D0D0D' },
  orange: { background: '#FF8C42', color: '#fff' },
  cream: { background: '#FAF7F2', color: '#0D0D0D', border: '1.5px solid #ddd' },
  red: { background: '#E8341A', color: '#fff' },
  mint: { background: '#e8f5e9', color: '#2E7D32', border: '1.5px dashed #A5D6A7' },
  black: { background: '#0D0D0D', color: '#fff' },
  blackLime: { background: '#0D0D0D', color: '#CAED4C' },
  lilac: { background: '#C084FC', color: '#fff' },
  teal: { background: '#009688', color: '#fff' },
  blue: { background: '#38BDF8', color: '#fff' },
}

export default function Skills() {
  const [active, setActive] = useState('ALL')
  const [hasEntered, setHasEntered] = useState(false)
  const sectionRef = useRef(null)

  const filtered = active === 'ALL' ? allSkills : allSkills.filter(s => s.cat === active)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '7rem 4rem', background: '#0D0D0D', color: '#fff' }}>
      <style>{`
        .filter-btn { cursor: pointer; transition: all 0.2s; border: none; font-family: 'Space Grotesk', sans-serif; }
        .filter-btn:hover { border-color: #CAED4C !important; color: #CAED4C !important; }
        .skill-list { display: flex; flex-wrap: wrap; align-content: flex-start; gap: 0.85rem; min-height: 12rem; }
        .skill-capsule { display: inline-flex; align-items: center; min-height: 44px; padding: 0.65rem 1.15rem; border-radius: 100px; font-family: 'Space Mono', monospace; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.035em; box-shadow: 0 5px 16px rgba(0,0,0,0.2); white-space: nowrap; }
        @keyframes skillCapsuleFloat {
          0% { transform: translate(var(--start-x), var(--start-y)) rotate(var(--start-rotate)) scale(0.9); opacity: 0.55; }
          28% { transform: translate(var(--float-x), var(--float-y)) rotate(var(--float-rotate)) scale(1.06); opacity: 1; }
          58% { transform: translate(var(--middle-x), var(--middle-y)) rotate(var(--middle-rotate)) scale(0.98); }
          82% { transform: translate(var(--settle-x), var(--settle-y)) rotate(var(--settle-rotate)) scale(1.02); }
          100% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
        }
        .skill-capsule.animate { animation: skillCapsuleFloat 3.6s ease-in-out both; }
        @media (prefers-reduced-motion: reduce) { .skill-capsule.animate { animation: none; } }
      `}</style>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CAED4C', marginBottom: '0.8rem' }}>What I Work With</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          The Toolkit.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', maxWidth: 220, lineHeight: 1.6, alignSelf: 'flex-end' }}>
          A focused overview of the tools and technologies I work with.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button key={c} className="filter-btn" aria-pressed={active === c} onClick={() => setActive(c)} style={{
            padding: '0.4rem 1.1rem', borderRadius: 100,
              background: active === c ? '#E8341A' : 'transparent',
              color: active === c ? '#fff' : 'rgba(255,255,255,0.55)',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            border: active === c ? 'none' : '1px solid rgba(255,255,255,0.15)',
          }}>{c}</button>
        ))}
      </div>

      <div className="skill-list" role="list" aria-label="Technology skills">
        {filtered.map((skill, index) => {
          const color = colors[skill.color]
          const offset = (index % 5) * 10 + 20
          const signedOffset = index % 2 === 0 ? offset : -offset
          const yOffset = (index % 3) * 9 + 12
          const signedYOffset = index % 2 === 0 ? -yOffset : yOffset
          const direction = index % 2 === 0 ? 1 : -1
          return (
          <div
            key={skill.name}
            className={`skill-capsule${hasEntered ? ' animate' : ''}`}
            role="listitem"
            style={{
              background: color.background,
              color: color.color,
              border: color.border,
              '--start-x': `${signedOffset}px`,
              '--start-y': `${signedYOffset}px`,
              '--float-x': `${-signedOffset * 0.7}px`,
              '--float-y': `${signedYOffset * 0.8}px`,
              '--float-rotate': `${direction * -7}deg`,
              '--middle-x': `${signedOffset * 0.55}px`,
              '--middle-y': `${-signedYOffset * 0.5}px`,
              '--start-rotate': `${index % 2 === 0 ? 5 : -5}deg`,
              '--middle-rotate': `${direction * 3}deg`,
              '--settle-x': `${-signedOffset * 0.2}px`,
              '--settle-y': `${-signedYOffset * 0.2}px`,
              '--settle-rotate': `${direction * -1.5}deg`,
            }}
          >
            {skill.name}
          </div>
          )
        })}
      </div>
    </section>
  )
}
