import { useEffect, useState, useRef } from 'react'

const words = ['Developer', 'AI Builder', 'Creative Director', 'Marketer', 'Python Dev']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const bubbleTimer = useRef(null)

  // Typewriter
  useEffect(() => {
    const word = words[wordIndex]
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayText(word.slice(0, charIndex + 1))
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1600)
        } else {
          setCharIndex(c => c + 1)
        }
      } else {
        setDisplayText(word.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setDeleting(false)
          setWordIndex(i => (i + 1) % words.length)
          setCharIndex(0)
        } else {
          setCharIndex(c => c - 1)
        }
      }
    }, deleting ? 55 : 95)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, wordIndex])

  const showBubble = () => {
    setBubbleVisible(true)
    clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => setBubbleVisible(false), 4000)
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '6rem 4rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--cream)',
    }}>
      {/* BG blobs */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: '#E8341A', top: -160, right: -100, opacity: 0.1, animation: 'floatBlob 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: '#CAED4C', bottom: 0, left: 60, opacity: 0.15, animation: 'floatBlob 7s ease-in-out infinite 3s' }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: '#C084FC', top: '40%', left: '45%', opacity: 0.1, animation: 'floatBlob 11s ease-in-out infinite 1s' }} />

      <style>{`
        @keyframes floatBlob { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.04)} }
        @keyframes slideLeft { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(70px)} to{opacity:1;transform:translateX(0)} }
        @keyframes blink { 0%,100%{border-color:#E8341A} 50%{border-color:transparent} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        .photo-img { transition: transform 0.4s ease, filter 0.3s; }
        .photo-img:hover { transform: scale(1.02) translateY(-8px); filter: brightness(1.05); }
      `}</style>

      {/* LEFT */}
      <div style={{ zIndex: 2, animation: 'slideLeft 1s ease forwards 0.2s', opacity: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#CAED4C', color: '#0D0D0D',
          fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.4rem 1.1rem', borderRadius: 100, marginBottom: '1.5rem',
        }}>
          <span style={{ width: 8, height: 8, background: '#0D0D0D', borderRadius: '50%', animation: 'pulse 1.5s ease infinite' }} />
          Available for Opportunities
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3.5rem, 7.5vw, 6.5rem)',
          fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em',
          marginBottom: '1.2rem',
        }}>
          <span style={{ display: 'block' }}>NETAL</span>
          <span style={{ display: 'block', color: '#E8341A', WebkitTextStroke: '2px #E8341A', WebkitTextFillColor: 'transparent' }}>GUPTA</span>
        </h1>

        <p style={{ fontSize: '1.25rem', fontWeight: 400, color: '#666', marginBottom: '2rem', minHeight: '2rem' }}>
          I&apos;m a{' '}
          <span style={{ color: '#E8341A', fontWeight: 700, borderRight: '2px solid #E8341A', paddingRight: 2, animation: 'blink 0.7s step-end infinite' }}>
            {displayText}
          </span>
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#0D0D0D', color: '#fff',
            padding: '0.9rem 2rem', borderRadius: 100,
            textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8341A'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.transform = 'scale(1)' }}
          >See My Work →</a>
          <a href="mailto:netalgupta4815@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1.5px solid #0D0D0D', color: '#0D0D0D',
            padding: '0.9rem 2rem', borderRadius: 100,
            textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8341A'; e.currentTarget.style.color = '#E8341A'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#0D0D0D'; e.currentTarget.style.color = '#0D0D0D'; e.currentTarget.style.transform = 'scale(1)' }}
          >Let&apos;s Talk</a>
        </div>

        {/* mini stats */}
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[['9.8', 'SGPA'], ['250+', 'Teams Beaten'], ['4', 'Hackathons']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#E8341A' }}>{n}</div>
              <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — photo */}
      <div style={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', animation: 'slideRight 1s ease forwards 0.4s', opacity: 0 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
          {/* Big red bg block */}
          <div style={{
            position: 'absolute', bottom: 0, left: 24, right: 0,
            height: '92%', background: '#E8341A',
            borderRadius: '32px 32px 32px 80px',
            transform: 'rotate(2.5deg)',
            transition: 'transform 0.3s',
          }} />
          {/* Lime accent */}
          <div style={{
            position: 'absolute', bottom: 20, left: -10,
            width: 120, height: 120, background: '#CAED4C',
            borderRadius: '50%', zIndex: 0, opacity: 0.6,
            animation: 'floatBlob 6s ease-in-out infinite',
          }} />

          {/* HELLO BUBBLE */}
          <div style={{
            position: 'absolute', top: 10, left: -80, zIndex: 10,
            background: '#0D0D0D', color: '#fff',
            padding: '0.9rem 1.2rem', borderRadius: '20px 20px 20px 4px',
            fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.5,
            maxWidth: 210, boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
            opacity: bubbleVisible ? 1 : 0,
            transform: bubbleVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
            transition: 'opacity 0.3s, transform 0.3s',
            pointerEvents: 'none',
          }}>
            👋 Hey! I&apos;m Netal — B.Tech CS student, AI builder &amp; creative. Nice to meet you!
            <div style={{
              position: 'absolute', bottom: -9, left: 18,
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '10px solid #0D0D0D',
            }} />
          </div>

          {/* Photo */}
          <img
            src="/netal.png"
            alt="Netal Gupta"
            className="photo-img"
            style={{
              position: 'relative', zIndex: 2, width: '100%',
              borderRadius: '28px 28px 28px 72px',
              objectFit: 'cover', cursor: 'pointer',
            }}
            onMouseEnter={showBubble}
            onClick={showBubble}
          />

          {/* Floating badges */}
          {[
            { text: '🏆 Top 12 / 250+', top: '8%', left: '-22%', delay: '0s', bg: '#CAED4C', color: '#0D0D0D' },
            { text: '🤖 AI Builder', bottom: '30%', right: '-15%', delay: '1.8s', bg: '#C084FC', color: '#fff' },
            { text: '⚡ 9.8 SGPA', bottom: '12%', left: '-18%', delay: '3.5s', bg: '#FF6B4A', color: '#fff' },
            { text: '🌟 Next.js', top: '28%', right: '-18%', delay: '2.5s', bg: '#0D0D0D', color: '#CAED4C' },
          ].map((b, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: b.top, bottom: b.bottom, left: b.left, right: b.right,
              background: b.bg, color: b.color,
              padding: '0.5rem 1.1rem', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              animation: `badgeFloat 3.5s ease-in-out infinite ${b.delay}`,
              zIndex: 5, whiteSpace: 'nowrap',
            }}>{b.text}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
