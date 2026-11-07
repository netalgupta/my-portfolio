import { useEffect, useState } from 'react'

const contributionsUrl = 'https://github-contributions-api.jogruber.de/v4/netalgupta?y=last'
const contributionColors = ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39']
const dateFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export default function GithubActivity() {
  const [contributions, setContributions] = useState(null)
  const [total, setTotal] = useState(null)
  const [chartError, setChartError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadContributions() {
      try {
        const response = await fetch(contributionsUrl, { signal: controller.signal })
        if (!response.ok) throw new Error(`Contribution service returned ${response.status}`)

        const data = await response.json()
        if (!Array.isArray(data.contributions)) throw new Error('Contribution service returned invalid data')

        const days = data.contributions.filter(day =>
          typeof day.date === 'string' && Number.isFinite(day.count) && Number.isFinite(day.level)
        )
        if (days.length === 0) throw new Error('Contribution service returned no daily activity')

        setContributions(days)
        setTotal(Number.isFinite(data.total?.lastYear)
          ? data.total.lastYear
          : days.reduce((sum, day) => sum + day.count, 0))
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Unable to load GitHub contribution activity:', error)
        setChartError(true)
      }
    }

    loadContributions()
    return () => controller.abort()
  }, [])

  return (
    <section id="github-activity" style={{ padding: '7rem 4rem', background: '#CAED4C', color: '#0D0D0D' }}>
      <style>{`
        #github-activity .activity-card { transition: transform 0.3s, box-shadow 0.3s; }
        #github-activity .activity-card:hover { transform: translateY(-6px); box-shadow: 0 28px 64px rgba(13,13,13,0.18); }
        #github-activity .chart-scroll { overflow-x: auto; padding: 1.5rem; border-radius: 18px; background: #fff; }
        #github-activity .contribution-grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 12px); grid-auto-columns: 12px; gap: 4px; width: max-content; }
        #github-activity .contribution-cell { width: 12px; height: 12px; border-radius: 3px; }
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
            <p aria-live="polite" style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
              {total === null ? 'Loading annual contribution total…' : `${total.toLocaleString()} contributions in the past year`}
            </p>
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
          {chartError ? (
            <p style={{ color: '#0D0D0D', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Daily contribution data is temporarily unavailable.{' '}
              <a href="https://github.com/netalgupta" target="_blank" rel="noreferrer" style={{ color: '#273414', fontWeight: 700 }}>
                View activity on GitHub
              </a>
            </p>
          ) : contributions === null ? (
            <p style={{ color: '#0D0D0D', fontSize: '0.9rem' }} role="status">Loading daily contributions…</p>
          ) : (
            <div className="contribution-grid" role="grid" aria-label="Daily GitHub contributions over the past year">
              {contributions.map(day => {
                const date = dateFormatter.format(new Date(`${day.date}T00:00:00Z`))
                const count = day.count
                const label = `${count} ${count === 1 ? 'contribution' : 'contributions'} on ${date}`
                const level = Math.min(Math.max(day.level, 0), contributionColors.length - 1)
                return (
                  <span
                    key={day.date}
                    className="contribution-cell"
                    role="gridcell"
                    title={label}
                    aria-label={label}
                    style={{ background: contributionColors[level] }}
                  />
                )
              })}
            </div>
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
