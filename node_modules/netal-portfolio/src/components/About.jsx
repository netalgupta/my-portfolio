import { useEffect, useRef } from 'react'

const stats = [
  { num: 10, label: 'Sem-4', decimal: true },
  { num: 9.1, label: 'CGPA', decimal: true },
]

function Counter({ target, decimal }) {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const start = performance.now()
        const duration = 1600
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const val = eased * target
          if (ref.current) ref.current.textContent = decimal ? val.toFixed(1) : Math.round(val).toLocaleString()
          if (p < 1) requestAnimationFrame(step)
          else if (ref.current) ref.current.textContent = decimal ? target.toFixed(1) : target.toLocaleString()
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, decimal])

  return <span ref={ref}>0</span>
}

export default function About() {
  return (
    <section id="about" style={{ padding: '5rem 3rem', background: 'var(--cream)' }}>
      <style>{`
        @keyframes avatarBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .stat-card:hover { transform:translateY(-8px) rotate(-1deg) !important; box-shadow:0 24px 48px rgba(0,0,0,0.1) !important; }
        @media (max-width: 900px) {
          #about { padding: 4rem 2rem; }
          #about .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          #about .about-meta { display: grid; grid-template-columns: 1fr; gap: 1.2rem; }
          #about img { width: 80px; }
          #about .stat-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
        }
        @media (max-width: 650px) {
          #about { padding: 3rem 1.2rem; }
          #about h2 { font-size: 1.8rem; line-height: 1.2; }
          #about .about-left { flex-direction: column; align-items: flex-start; }
          #about .about-left > div { display: block; max-width: 100%; word-wrap: break-word; }
          #about .about-left img { width: 70px; margin-bottom: 0.8rem; flex-shrink: 0; }
          #about .about-left p { font-size: 0.95rem; line-height: 1.7; max-width: 100%; word-wrap: break-word; overflow-wrap: break-word; }
          #about .about-right { grid-template-columns: 1fr !important; }
          #about .about-meta { grid-template-columns: 1fr !important; gap: 0.8rem !important; }
          #about .about-badges { gap: 0.4rem; flex-wrap: wrap; }
          #about .about-badges span { padding: 0.3rem 0.5rem; font-size: 0.68rem; }
        }
      `}</style>
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div className="reveal">
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.8rem' }}>About Me</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            I build things that <em style={{ color: '#E8341A' }}>matter</em>.
          </h2>

          {/* Cute avatar */}
          <div className="about-left" style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <img src="/avatar_dev.png" alt="dev avatar" style={{ width: 90, borderRadius: 20, animation: 'avatarBob 3s ease-in-out infinite', flexShrink: 0 }} />
            <div style={{ maxWidth: '100%', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', marginBottom: '1rem', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                B.Tech CSBS @ KJ Somaiya School of Engineering, SGPA <strong>10</strong>. I live at the intersection of code, AI, and creativity — building products that solve real problems.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', marginBottom: '1rem', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                From shipping AI-powered Alzheimer's companions to creating viral social content, I bring technical depth and creative instinct to everything I touch.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                Currently Machine Learning Intern at <strong>Inhouse</strong>, and recently a Software Development Intern at <strong>SWDC</strong> where I shipped Flutter apps. 10th: 94.6% · MHT-CET: 97 percentile.
              </p>
              <div className="about-meta" style={{ marginTop: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E8341A', marginBottom: '0.6rem' }}>Technical Skills</div>
                  <div className="about-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Python', 'Java', 'SQL', 'Flutter (Dart)'].map(s => (
                      <span key={s} style={{ background: '#0D0D0D', color: '#fff', padding: '0.35rem 0.6rem', borderRadius: 100, fontSize: '0.78rem', fontWeight: 700 }}>{s}</span>
                    ))}
                    {['React', 'Next.js', 'Node.js', 'REST APIs', 'Git', 'Firebase'].map(s => (
                      <span key={s} style={{ background: '#E8341A', color: '#0D0D0D', padding: '0.35rem 0.6rem', borderRadius: 100, fontSize: '0.78rem', fontWeight: 700 }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E8341A', marginBottom: '0.6rem' }}>Design & Coursework</div>
                  <div style={{ fontSize: '0.95rem', color: '#333', lineHeight: 1.6 }}>
                    <div>Design tools: Figma, Canva, Adobe Photoshop, DaVinci Resolve.</div>
                    <div style={{ marginTop: '0.5rem' }}>Coursework: Data Structures & Algorithms, DBMS, Operating Systems, OOP, Software Engineering.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="reveal about-right">
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{
              background: i % 2 === 0 ? '#0D0D0D' : '#E8341A',
              borderRadius: 24, padding: '1.2rem',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default',
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.6rem', fontWeight: 900, color: i % 2 === 0 ? '#CAED4C' : '#fff', lineHeight: 1 }}>
                <Counter target={s.num} decimal={s.decimal} />
                {s.num === 250 && <span style={{ fontSize: '1.5rem' }}>+</span>}
                {s.num === 4500 && <span style={{ fontSize: '1.5rem' }}>+</span>}
              </div>
              <div style={{ fontSize: '0.82rem', color: i % 2 === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)', marginTop: '0.5rem', fontWeight: 600, letterSpacing: '0.03em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
