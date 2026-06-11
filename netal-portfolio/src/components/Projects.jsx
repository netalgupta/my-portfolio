import { useState, useRef } from 'react'

const saathiScreens = ['/sc1.png', '/sc2.png', '/sc3.png', '/sc4.png']

function Carousel({ images, placeholderCount = 0 }) {
  const [idx, setIdx] = useState(0)
  const all = [...images, ...Array(placeholderCount).fill(null)]
  const total = all.length

  return (
    <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: '#111', aspectRatio: '16/9' }}>
      <style>{`
        @keyframes fadeSlide { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        .carousel-img { animation: fadeSlide 0.4s ease; }
      `}</style>
      {all[idx] ? (
        <img key={idx} src={all[idx]} className="carousel-img" alt={`screenshot ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'rgba(255,255,255,0.2)', gap: 8 }}>
          <div style={{ fontSize: '2.5rem' }}>📸</div>
          <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Add your screenshot here</p>
          <p style={{ fontSize: '0.72rem', opacity: 0.5 }}>Drop image in /public/ and update src</p>
        </div>
      )}
      {/* Controls */}
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, alignItems: 'center' }}>
        {all.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 24 : 8, height: 8, borderRadius: 100,
            background: i === idx ? '#CAED4C' : 'rgba(255,255,255,0.35)',
            border: 'none', cursor: 'pointer',
            transition: 'width 0.3s, background 0.3s',
            padding: 0,
          }} />
        ))}
      </div>
      <button onClick={() => setIdx(i => (i - 1 + total) % total)} style={{
        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none',
        width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>‹</button>
      <button onClick={() => setIdx(i => (i + 1) % total)} style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none',
        width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>›</button>
    </div>
  )
}

const emojiAvatars = [
  { emoji: '🧠', bg: '#FFE4E1', label: 'SaathiCare' },
  { emoji: '⚡', bg: '#F0FFF0', label: 'CP Tracker' },
  { emoji: '👁️', bg: '#FFF0E6', label: 'HackTrack' },
]

function ProjectCard({ num, badge, badgeBg, title, date, stack, bullets, appLink, ghLink, carouselImages, placeholderCount = 2, accentColor, avatar }) {
  return (
    <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center', marginBottom: '6rem' }}>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '7rem', fontWeight: 900, color: 'rgba(0,0,0,0.04)', lineHeight: 1, marginBottom: '-1.5rem' }}>{num}</div>
        <div style={{
          background: '#fff', borderRadius: 28, padding: '2.2rem',
          border: '1px solid rgba(0,0,0,0.06)',
          transition: 'transform 0.4s, box-shadow 0.4s',
        }}
          className="project-card"
          onMouseEnter={e => { e.currentTarget.style.transform = 'perspective(900px) rotateX(2deg) rotateY(-3deg) translateY(-10px)'; e.currentTarget.style.boxShadow = '0 32px 64px rgba(0,0,0,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
        >
          {/* Avatar deco */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: avatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{avatar.emoji}</div>
            <span style={{ background: badgeBg, color: badgeBg === '#0D0D0D' ? '#CAED4C' : '#fff', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.3rem 0.9rem', borderRadius: 100 }}>{badge}</span>
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.3rem', lineHeight: 1.2 }}>{title}</h3>
          <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '1rem', fontWeight: 600 }}>{date}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
            {stack.map(s => <span key={s} style={{ background: '#F0EDE8', fontSize: '0.74rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 100 }}>{s}</span>)}
          </div>
          <ul style={{ fontSize: '0.88rem', lineHeight: 1.75, color: '#444', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <a href={appLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.55rem 1.1rem', background: accentColor, color: '#fff', borderRadius: 100, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>↗ Live App</a>
            <a href={ghLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.55rem 1.1rem', border: '1.5px solid rgba(0,0,0,0.15)', color: '#0D0D0D', borderRadius: 100, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D0D0D' }}>⌥ GitHub</a>
          </div>
        </div>
      </div>
      <div>
        <Carousel images={carouselImages} placeholderCount={placeholderCount} />
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '7rem 4rem', background: 'var(--cream)' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8341A', marginBottom: '0.8rem' }}>What I've Built</p>
      <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '4rem' }}>Selected Projects</h2>

      <ProjectCard
        num="01"
        badge="🏆 Top 12 / 250+ Teams"
        badgeBg="#E8341A"
        title="SaathiCare"
        date="Feb 2026 · AfterMath Hackathon · Team Lead"
        stack={['Next.js', 'TypeScript', 'Gemini API', 'SQLite', 'JWT', 'Web Speech API']}
        bullets={[
          'LLM-based multilingual AI companion for Alzheimer\'s patients with memory-aware conversation',
          '4–5s response latency on constrained deployment via prompt optimisation',
          'Real-time GPS emergency system + QR patient ID + caregiver alerts',
          'Tri-role architecture: Patient · Caretaker · Guardian',
        ]}
        appLink="https://snack-alzheimer-1.onrender.com/"
        ghLink="https://github.com/netalgupta/Snack-Alzheimer"
        carouselImages={saathiScreens}
        placeholderCount={0}
        accentColor="#E8341A"
        avatar={emojiAvatars[0]}
      />

      <ProjectCard
        num="02"
        badge="GDG Hackathon"
        badgeBg="#0D0D0D"
        title="AI CP Tracker"
        date="Dec 2025 · GDG Hackathon"
        stack={['Firebase', 'Google Auth', 'Gemini API']}
        bullets={[
          'LLM-based code evaluation — logic, edge cases, time complexity, best practices',
          'AI chatbot for iterative learning via structured feedback loops',
          'Real-time leaderboard with persistent session management',
        ]}
        appLink="https://cptracker-gdg.vercel.app/"
        ghLink="https://github.com/netalgupta/All-In_CodeEvaluator_GDG"
        carouselImages={[]}
        placeholderCount={3}
        accentColor="#CAED4C"
        avatar={emojiAvatars[1]}
      />

      <ProjectCard
        num="03"
        badge="🥇 Top 6 — Nexathon"
        badgeBg="#FF8C42"
        title="HackTrack"
        date="Dec 2025 · Nexathon"
        stack={['Recognition API', 'Role-based Architecture']}
        bullets={[
          'Facial recognition with 50m geo-fence validation + tamper-proof dynamic QR',
          'Analytics dashboard and attendance pattern tracking',
        ]}
        appLink="https://studiq-flowfinal.vercel.app/"
        ghLink="https://github.com/netalgupta/Attendance-App"
        carouselImages={[]}
        placeholderCount={3}
        accentColor="#FF8C42"
        avatar={emojiAvatars[2]}
      />
    </section>
  )
}
