import { useEffect, useRef } from 'react'

const stats = [
  { num: 9.8, label: 'SGPA', decimal: true },
  { num: 250, label: 'Teams Competed Against', decimal: false },
  { num: 4, label: 'Hackathon Wins/Places', decimal: false },
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
    <section id="about" style={{ padding: '7rem 4rem', background: 'var(--cream)' }}>
      <style>{`
        @keyframes avatarBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .stat-card:hover { transform:translateY(-8px) rotate(-1deg) !important; box-shadow:0 24px 48px rgba(0,0,0,0.1) !important; }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div className="reveal">
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.8rem' }}>About Me</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            I build things that <em style={{ color: '#E8341A' }}>matter</em>.
          </h2>

          {/* Cute avatar */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
            <img src="/avatar_dev.png" alt="dev avatar" style={{ width: 110, borderRadius: 20, animation: 'avatarBob 3s ease-in-out infinite', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', marginBottom: '1rem' }}>
                B.Tech CSBS @ KJ Somaiya School of Engineering, SGPA <strong>9.8</strong>. I live at the intersection of code, AI, and creativity — building products that solve real problems.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', marginBottom: '1rem' }}>
                From shipping AI-powered Alzheimer's companions to creating viral social content, I bring technical depth and creative instinct to everything I touch.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }}>
                Currently interning at <strong>SWDC</strong> building with Flutter. 10th: 94.6% · MHT-CET: 97 percentile.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="reveal">
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{
              background: i % 2 === 0 ? '#0D0D0D' : '#E8341A',
              borderRadius: 24, padding: '1.8rem',
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
