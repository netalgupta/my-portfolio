import { useState } from 'react'

const allSkills = [
  { name: 'PYTHON', cat: 'Languages' },
  { name: 'JAVASCRIPT', cat: 'Languages' },
  { name: 'JAVA', cat: 'Languages' },
  { name: 'C', cat: 'Languages' },
  { name: 'HTML/CSS', cat: 'Languages' },
  { name: 'SQL', cat: 'Languages' },
  { name: 'TYPESCRIPT', cat: 'Languages', learning: true },
  { name: 'DART', cat: 'Languages', learning: true },
  { name: 'GEMINI API', cat: 'AI / ML' },
  { name: 'LLM INTEGRATION', cat: 'AI / ML' },
  { name: 'PROMPT ENGINEERING', cat: 'AI / ML' },
  { name: 'WEB SPEECH API', cat: 'AI / ML' },
  { name: 'FACE RECOGNITION', cat: 'AI / ML' },
  { name: 'NUMPY', cat: 'AI / ML', learning: true },
  { name: 'PANDAS', cat: 'AI / ML', learning: true },
  { name: 'FAISS / RAG', cat: 'AI / ML' },
  { name: 'OLLAMA', cat: 'AI / ML' },
  { name: 'NEXT.JS', cat: 'Frameworks' },
  { name: 'REACT', cat: 'Frameworks' },
  { name: 'NODE.JS', cat: 'Frameworks' },
  { name: 'FIREBASE', cat: 'Frameworks' },
  { name: 'FASTAPI', cat: 'Frameworks' },
  { name: 'TAILWIND CSS', cat: 'Frameworks' },
  { name: 'FLUTTER', cat: 'Frameworks', learning: true },
  { name: 'LANGGRAPH', cat: 'Frameworks', learning: true },
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

export default function Skills() {
  const [active, setActive] = useState('ALL')

  const filtered = active === 'ALL' ? allSkills : allSkills.filter(s => s.cat === active)

  return (
    <section id="skills" style={{ padding: '7rem 4rem', background: '#0D0D0D', color: '#fff' }}>
      <style>{`
        .filter-btn { cursor: pointer; transition: all 0.2s; border: none; font-family: 'Space Grotesk', sans-serif; }
        .filter-btn:hover { border-color: #CAED4C !important; color: #CAED4C !important; }
        .skill-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; }
        .skill-tag { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; min-height: 52px; padding: 0.85rem 1rem; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; background: rgba(255,255,255,0.045); color: rgba(255,255,255,0.9); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.02em; }
        .skill-learning { color: #CAED4C; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; white-space: nowrap; }
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
        {filtered.map(skill => (
          <div key={skill.name} className="skill-tag" role="listitem">
            <span>{skill.name}</span>
            {skill.learning && <span className="skill-learning">Learning</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
