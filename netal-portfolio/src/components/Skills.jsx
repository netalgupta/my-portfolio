import { useEffect, useRef, useState } from 'react'

const allSkills = [
  { name: 'PYTHON', cat: 'Languages' },
  { name: 'JAVASCRIPT', cat: 'Languages' },
  { name: 'JAVA', cat: 'Languages' },
  { name: 'C', cat: 'Languages' },
  { name: 'HTML/CSS', cat: 'Languages' },
  { name: 'SQL', cat: 'Languages' },
  { name: 'TYPESCRIPT', cat: 'Languages' },
  { name: 'DART', cat: 'Languages' },
  { name: 'GEMINI', cat: 'AI / ML' },
  { name: 'LLM INTEGRATION', cat: 'AI / ML' },
  { name: 'PROMPT ENGINEERING', cat: 'AI / ML' },
  { name: 'WEB SPEECH API', cat: 'AI / ML' },
  { name: 'FACE RECOGNITION', cat: 'AI / ML' },
  { name: 'NUMPY', cat: 'AI / ML' },
  { name: 'PANDAS', cat: 'AI / ML' },
  { name: 'FAISS / RAG', cat: 'AI / ML' },
  { name: 'OLLAMA', cat: 'AI / ML' },
  { name: 'NEXT.JS', cat: 'Frameworks' },
  { name: 'REACT', cat: 'Frameworks' },
  { name: 'NODE.JS', cat: 'Frameworks' },
  { name: 'FIREBASE', cat: 'Frameworks' },
  { name: 'FASTAPI', cat: 'Frameworks' },
  { name: 'TAILWIND CSS', cat: 'Frameworks' },
  { name: 'FLUTTER', cat: 'Frameworks' },
  { name: 'LANGGRAPH', cat: 'Frameworks' },
  { name: 'HIGGSFIELD', cat: 'Editing' },
  { name: 'CAPCUT', cat: 'Editing' },
  { name: 'INSTAGRAM EDITS', cat: 'Editing' },
  { name: 'CANVA', cat: 'Editing' },
  { name: 'ADOBE PHOTOSHOP', cat: 'Editing' },
  { name: 'ADOBE PREMIERE PRO', cat: 'Editing' },
  { name: 'DAVINCI RESOLVE', cat: 'Editing' },
  { name: 'POSTGRESQL', cat: 'Tools' },
  { name: 'GITHUB', cat: 'Tools' },
  { name: 'NEO4J', cat: 'Tools' },
  { name: 'DOCKER', cat: 'Tools' },
  { name: 'DECK.GL', cat: 'Tools' },
  { name: 'VERCEL', cat: 'Tools' },
  { name: 'MYSQL', cat: 'Tools' },
  { name: 'VS CODE', cat: 'Tools' },
  { name: 'FIGMA', cat: 'Tools' },
]

const CATS = ['ALL', 'Languages', 'AI / ML', 'Frameworks', 'Editing', 'Tools']
const categoryColors = {
  Languages: { background: '#CAED4C', color: '#0D0D0D' },
  'AI / ML': { background: '#DCC8F2', color: '#0D0D0D' },
  Frameworks: { background: '#273414', color: '#FFFFFF' },
  Editing: { background: '#B9A1D4', color: '#0D0D0D' },
  Tools: { background: '#0D0D0D', color: '#CAED4C', border: '1px solid #CAED4C' },
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
            background: active === c ? '#CAED4C' : 'transparent',
            color: active === c ? '#0D0D0D' : 'rgba(255,255,255,0.55)',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            border: active === c ? 'none' : '1px solid rgba(255,255,255,0.15)',
          }}>{c}</button>
        ))}
      </div>

      <div className="skill-list" role="list" aria-label="Technology skills">
        {filtered.map((skill, index) => {
          const color = categoryColors[skill.cat]
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
