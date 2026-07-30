import { useEffect, useState } from 'react'

const links = ['About', 'Skills', 'Projects', 'Hackathons', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      padding: '1.2rem 3rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', rowGap: '0.75rem',
      background: scrolled ? 'rgba(250,247,242,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.4s',
    }}>
      <a href="#hero" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900, color: '#0D0D0D', textDecoration: 'none' }}>
        NG<span style={{ color: '#E8341A' }}>.</span>
      </a>
      <ul style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              textDecoration: 'none', color: '#0D0D0D',
              fontSize: '0.82rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              position: 'relative',
            }}
              onMouseEnter={e => e.target.style.color = '#E8341A'}
              onMouseLeave={e => e.target.style.color = '#0D0D0D'}
            >{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
