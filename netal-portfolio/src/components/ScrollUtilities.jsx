import { useEffect, useState } from 'react'

export default function ScrollUtilities() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const updateScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      setShowBackToTop(window.scrollY > 400)
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  return (
    <>
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(scrollProgress)}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: 3,
          zIndex: 1100, background: 'rgba(13,13,13,0.08)', pointerEvents: 'none',
        }}
      >
        <div style={{
          width: `${scrollProgress}%`, height: '100%',
          background: '#E8341A', transition: 'width 0.1s linear',
        }} />
      </div>
      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', right: '1.5rem', bottom: '1.5rem', zIndex: 1050,
            width: 46, height: 46, border: 'none', borderRadius: '50%',
            background: '#CAED4C', color: '#0D0D0D', fontSize: '1.4rem',
            fontWeight: 700, boxShadow: '0 6px 20px rgba(0,0,0,0.2)', cursor: 'pointer',
          }}
        >
          ↑
        </button>
      )}
    </>
  )
}
