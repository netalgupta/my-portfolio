import { useEffect, useRef } from 'react'

const items = [
  { date: 'July 2026 · Present', role: 'Machine Learning Intern', company: 'Inhouse', desc: 'Working on a realistic virtual try-on experience: building models for garment-to-body mapping and image synthesis to enable accurate, real-time virtual apparel fitting.', tag: '🔥 Current', tagBg: '#CAED4C', tagColor: '#0D0D0D', avatar: '🤖' },
  { date: 'Jun 2026 – Jul 2026', role: 'Software Development Intern', company: 'SWDC — Software Development Working Committee', desc: 'Developed cross-platform mobile applications with Flutter/Dart; collaborated on full-stack feature development and evaluated frameworks to improve performance and UX.', avatar: '👨‍💻' },
  { date: 'Apr 2026', role: 'Campus Ambassador', company: 'Internshala', desc: 'Drove student outreach and platform adoption through targeted campaigns and peer engagement.', avatar: '📣' },
  { date: 'Aug – Sept 2025', role: 'Social Media & Marketing Intern', company: 'Fostride', desc: 'Trend-driven short-form content achieving 2K–4.5K+ views per reel. End-to-end creative production from ideation to publishing.', avatar: '🎬' },
  { date: 'Aug 2025', role: 'Marketing Intern', company: 'Corizo', desc: 'Executed lead generation campaigns, analysed performance data, contributed to optimisation strategies.', avatar: '📈' },
  { date: '2024 – 2025', role: 'PR Team Member', company: 'KJSSE ACM Student Chapter', desc: 'Led visual and written communication for campus outreach; event branding and creative collateral.', avatar: '🎨' },
]

export default function Experience() {
  const lineRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.style.height = '100%'
    }, { threshold: 0.1 })
    if (lineRef.current) obs.observe(lineRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" style={{ padding: '5rem 3rem', background: 'var(--cream)' }}>
      <style>{`
        .tl-line { height: 0; background: #E8341A; width: 2px; transition: height 1.2s ease; }
        .tl-item:hover .tl-dot { transform: scale(1.4); background: #CAED4C !important; }
        .tl-item:hover .tl-card { transform: translateX(8px); }
        .tl-card { transition: transform 0.3s; }
        .tl-dot { transition: transform 0.3s, background 0.3s; }
        @media (max-width: 900px) {
          #experience { padding: 4rem 2rem; }
          #experience .experience-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          #experience .timeline-wrapper { padding-left: 1.2rem; }
          #experience .tl-item { padding-bottom: 1.2rem !important; }
          #experience .tl-card { padding: 1rem; }
          #experience .tl-dot { left: -1.75rem !important; }
          #experience .sticky-panel { position: static; }
        }
        @media (max-width: 650px) {
          #experience { padding: 3rem 1.2rem; }
          #experience .timeline-wrapper { padding-left: 1rem !important; }
          #experience .tl-card { font-size: 0.9rem; padding: 0.9rem !important; }
          #experience .tl-date { font-size: 0.65rem !important; margin-bottom: 0.3rem !important; }
          #experience .tl-role-line { flex-wrap: wrap; gap: 0.3rem !important; align-items: flex-start !important; }
          #experience .tl-role { font-size: 1rem !important; }
          #experience .tl-company { font-size: 0.75rem !important; margin-bottom: 0.5rem !important; word-wrap: break-word; overflow-wrap: break-word; }
          #experience .tl-desc { font-size: 0.82rem !important; line-height: 1.5; max-width: 100% !important; overflow-wrap: break-word; word-wrap: break-word; }
          #experience .tl-dot { left: -1.4rem !important; top: 8px !important; }
          #experience .tl-avatar { font-size: 0.95rem !important; flex-shrink: 0; }
        }
      `}</style>

      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.8rem' }}>Where I've Worked</p>
      <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '3.5rem' }}>Experience</h2>

      <div className="experience-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div className="timeline-wrapper" style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          {/* line */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: 2 }}>
            <div className="tl-line" ref={lineRef} />
          </div>

          {items.map((item, i) => (
            <div key={i} className="tl-item reveal" style={{ paddingBottom: '1.6rem', position: 'relative' }}>
              <div className="tl-dot" style={{
                position: 'absolute', left: -2.5 * 16 - 7, top: 6,
                width: 14, height: 14, borderRadius: '50%',
                background: '#E8341A', border: '3px solid var(--cream)',
              }} />
              <div className="tl-card">
                <div className="tl-date" style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.2rem' }}>{item.date}</div>
                <div className="tl-role-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span className="tl-avatar" style={{ fontSize: '1.05rem', flexShrink: 0 }}>{item.avatar}</span>
                  <span className="tl-role" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.2 }}>{item.role}</span>
                  {item.tag && <span className="tl-tag" style={{ background: item.tagBg, color: item.tagColor, fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: 100, marginLeft: 2, flexShrink: 0 }}>{item.tag}</span>}
                </div>
                <div className="tl-company" style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.4rem', fontWeight: 600, wordWrap: 'break-word', overflowWrap: 'break-word' }}>{item.company}</div>
                <div className="tl-desc" style={{ fontSize: '0.86rem', lineHeight: 1.6, color: '#444', maxWidth: 420 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side deco */}
        <div className="reveal sticky-panel" style={{ position: 'sticky', top: '6.5rem' }}>
          <div style={{ background: '#0D0D0D', borderRadius: 32, padding: '2rem', color: '#fff' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
              Doing it all — <em style={{ color: '#CAED4C' }}>simultaneously</em>.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
              Interning, shipping projects, competing in hackathons, and managing social media — all while maintaining a 9.1 CGPA.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {['Flutter', 'Next.js', 'Gemini API', 'Python', 'Social Media', 'Creative'].map(t => (
                <span key={t} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', fontWeight: 600, padding: '0.4rem 0.9rem', borderRadius: 100 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
