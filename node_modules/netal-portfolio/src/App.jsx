import { useEffect, useRef } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GithubActivity from './components/GithubActivity'
import Hackathons from './components/Hackathons'
import Experience from './components/Experience'
import Resume from './components/Resume'
import Certifications from './components/Certifications'
import DinoGame from './components/DinoGame'
import ScrollUtilities from './components/ScrollUtilities'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <ScrollUtilities />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <GithubActivity />
      <Hackathons />
      <Experience />
      <Resume />
      <Certifications />
      <DinoGame />
      <Contact />
      <Footer />
    </>
  )
}
