import { useState } from 'react'

const chartUrl = 'https://ghchart.rshah.org/netalgupta'

export default function GithubActivity() {
  const [chartUnavailable, setChartUnavailable] = useState(false)

  return (
    <section id="github-activity" style={{ padding: '7rem 4rem', background: '#CAED4C', color: '#0D0D0D' }}>
      <style>{`
        #github-activity .activity-card { transition: transform 0.3s, box-shadow 0.3s; }
        #github-activity .activity-card:hover { transform: translateY(-6px); box-shadow: 0 28px 64px rgba(13,13,13,0.18); }
        #github-activity .chart-scroll { overflow-x: auto; padding: 1.5rem; border-radius: 18px; background: #fff; }
        #github-activity .chart-scroll img { display: block; width: 100%; min-width: 663px; height: auto; }
        @media (max-width: 640px) {
          #github-activity { padding: 4rem 1rem !important; }
          #github-activity .activity-card { padding: 1.25rem !important; }
          #github-activity .chart-scroll { padding: 1rem; }
        }
      `}</style>
      <div className="activity-card reveal" style={{
        maxWidth: 1100, margin: '0 auto', padding: '2.5rem',
        borderRadius: 32, background: '#0D0D0D', color: '#fff',
        boxShadow: '0 20px 56px rgba(13,13,13,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CAED4C', marginBottom: '0.8rem' }}>Open-source activity</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.6rem)', fontWeight: 900, lineHeight: 1.05 }}>
              A year in commits.
            </h2>
          </div>
          <a
            href="https://github.com/netalgupta"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.75rem 1.2rem', borderRadius: 100,
              border: '1px solid rgba(220,200,242,0.65)', color: '#DCC8F2',
              textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700,
            }}
          >
            View GitHub profile
          </a>
        </div>

        <div className="chart-scroll">
          {chartUnavailable ? (
            <p style={{ color: '#0D0D0D', fontSize: '0.9rem', lineHeight: 1.6 }}>
              The contribution chart is temporarily unavailable.{' '}
              <a href="https://github.com/netalgupta" target="_blank" rel="noreferrer" style={{ color: '#273414', fontWeight: 700 }}>
                View activity on GitHub
              </a>
            </p>
          ) : (
            <img
              src={chartUrl}
              alt="GitHub contribution heatmap for Netal Gupta over the past year"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setChartUnavailable(true)}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>
          <span>Weekly contribution map</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            Less
            <i aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: '#EBEDF0' }} />
            <i aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: '#9BE9A8' }} />
            <i aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: '#40C463' }} />
            <i aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: '#216E39' }} />
            More
          </span>
        </div>
      </div>
    </section>
  )
}
