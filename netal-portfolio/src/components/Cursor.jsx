import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    let mx = 0, my = 0, rx = 0, ry = 0

    const move = (e) => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }
    document.addEventListener('mousemove', move)

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(animRing)
    }
    animRing()

    const interactables = document.querySelectorAll('a, button, .project-card, .hack-card, .stat-card, .skill-bubble')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '6px'; cursor.style.height = '6px'
        ring.style.width = '60px'; ring.style.height = '60px'
      })
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px'
        ring.style.width = '40px'; ring.style.height = '40px'
      })
    })

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
