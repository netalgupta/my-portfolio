export default function Footer() {
  return (
    <footer style={{ background: '#0D0D0D', color: 'rgba(255,255,255,0.35)', textAlign: 'center', padding: '2rem', fontSize: '0.82rem' }}>
      <p>
        Built with ❤️ by{' '}
        <span style={{ color: '#CAED4C', fontWeight: 700 }}>Netal Gupta</span>
        {' · '}2026
        {' · '}
        <a href="https://github.com/netalgupta" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
          github.com/netalgupta
        </a>
      </p>
    </footer>
  )
}
