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
  { name: 'GEMINI API', cat: 'AI / ML' },
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
  { name: 'FIGMA', cat: 'Design' },
  { name: 'CANVA', cat: 'Design' },
  { name: 'ADOBE PHOTOSHOP', cat: 'Design' },
  { name: 'ADOBE PRO', cat: 'Design' },
  { name: 'POSTGRESQL', cat: 'Tools' },
  { name: 'GITHUB', cat: 'Tools' },
  { name: 'NEO4J', cat: 'Tools' },
  { name: 'DOCKER', cat: 'Tools' },
  { name: 'DECK.GL', cat: 'Tools' },
  { name: 'VERCEL', cat: 'Tools' },
  { name: 'MYSQL', cat: 'Tools' },
  { name: 'VS CODE', cat: 'Tools' },
]

const CATS = ['ALL', 'Languages', 'AI / ML', 'Frameworks', 'Design', 'Tools']
const colors = [
  { background: '#CAED4C', color: '#0D0D0D' },
  { background: '#E8341A', color: '#FFFFFF' },
  { background: '#6D28D9', color: '#FFFFFF' },
  { background: '#2DD4BF', color: '#0D0D0D' },
  { background: '#FF8C42', color: '#0D0D0D' },
  { background: '#1A1A1A', color: '#CAED4C' },
  { background: '#C084FC', color: '#0D0D0D' },
]

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
        @keyframes skillCapsuleSettle {
          0% { transform: translate(var(--start-x), var(--start-y)) rotate(var(--start-rotate)) scale(0.82); opacity: 0.45; }
          48% { transform: translate(var(--middle-x), var(--middle-y)) rotate(var(--middle-rotate)) scale(1.06); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
        }
        .skill-capsule.animate { animation: skillCapsuleSettle 3.6s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
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
          const color = colors[index % colors.length]
          const offset = (index % 5) * 5 + 6
          const signedOffset = index % 2 === 0 ? offset : -offset
          const yOffset = (index % 3) * 7 + 7
          const signedYOffset = index % 2 === 0 ? -yOffset : yOffset
          return (
          <div
            key={skill.name}
            className={`skill-capsule${hasEntered ? ' animate' : ''}`}
            role="listitem"
            style={{
              background: color.background,
              color: color.color,
              '--start-x': `${signedOffset}px`,
              '--start-y': `${signedYOffset}px`,
              '--middle-x': `${-signedOffset / 2}px`,
              '--middle-y': `${-signedYOffset / 2}px`,
              '--start-rotate': `${index % 2 === 0 ? 5 : -5}deg`,
              '--middle-rotate': `${index % 2 === 0 ? -2.5 : 2.5}deg`,
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
