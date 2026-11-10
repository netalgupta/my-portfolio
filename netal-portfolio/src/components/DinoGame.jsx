import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Constants ─────────────────────────────────────────────────────────────
const W = 800
const H = 300
const GROUND_Y = 240
const DINO_X = 80
const DINO_W = 44
const DINO_H = 52
const GRAVITY = 0.6
const JUMP_V = -13
const INITIAL_SPEED = 3
const SPEED_INCREMENT = 0.0003
const MAX_SPEED = 7

// Obstacle shapes: { w, h, label, color, emoji }
const OBSTACLE_TYPES = [
  { w: 28, h: 44, label: 'BUG',   color: '#E8341A', emoji: '🐛' },
  { w: 36, h: 36, label: 'ERROR', color: '#6D28D9', emoji: '❌' },
  { w: 24, h: 56, label: 'NULL',  color: '#FF8C42', emoji: '⚠️' },
  { w: 40, h: 32, label: 'CRASH', color: '#0D0D0D', emoji: '💥' },
  { w: 30, h: 48, label: '404',   color: '#E8341A', emoji: '🚫' },
]

// Flying obstacle (like birds — but its a "memory leak" flying chip)
const FLYING_OBS = { w: 46, h: 24, label: 'LEAK', color: '#C084FC', emoji: '☁️' }

function randomObstacle(x) {
  const isFlying = Math.random() < 0.2
  if (isFlying) {
    return { ...FLYING_OBS, x, y: GROUND_Y - 70 - Math.random() * 40, flying: true }
  }
  const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)]
  return { ...type, x, y: GROUND_Y - type.h + 4, flying: false }
}

// Draw the dino (pixel-art style with canvas)
function drawDino(ctx, x, y, frame, isDead) {
  ctx.save()
  // Body
  ctx.fillStyle = isDead ? '#888' : '#0D0D0D'
  ctx.beginPath()
  ctx.roundRect(x, y + 12, DINO_W - 10, DINO_H - 12, 6)
  ctx.fill()

  // Head
  ctx.fillStyle = isDead ? '#888' : '#0D0D0D'
  ctx.beginPath()
  ctx.roundRect(x + 10, y, DINO_W - 2, 24, 6)
  ctx.fill()

  // Eye
  ctx.fillStyle = isDead ? '#E8341A' : '#CAED4C'
  ctx.beginPath()
  ctx.arc(x + DINO_W - 4, y + 8, 4, 0, Math.PI * 2)
  ctx.fill()

  if (isDead) {
    // X eyes
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x + DINO_W - 7, y + 5); ctx.lineTo(x + DINO_W - 1, y + 11)
    ctx.moveTo(x + DINO_W - 1, y + 5); ctx.lineTo(x + DINO_W - 7, y + 11)
    ctx.stroke()
  }

  // Legs animation
  const leg1Off = frame % 2 === 0 ? 0 : 8
  const leg2Off = frame % 2 === 0 ? 8 : 0
  ctx.fillStyle = isDead ? '#888' : '#0D0D0D'
  ctx.beginPath()
  ctx.roundRect(x + 6, y + DINO_H - 14 + leg1Off, 10, 14 - leg1Off, 3)
  ctx.fill()
  ctx.beginPath()
  ctx.roundRect(x + 20, y + DINO_H - 14 + leg2Off, 10, 14 - leg2Off, 3)
  ctx.fill()

  // Tail
  ctx.fillStyle = isDead ? '#888' : '#0D0D0D'
  ctx.beginPath()
  ctx.moveTo(x, y + 20)
  ctx.lineTo(x - 14, y + 30)
  ctx.lineTo(x, y + 36)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

function drawObstacle(ctx, obs) {
  ctx.save()
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  ctx.beginPath()
  ctx.ellipse(obs.x + obs.w / 2, GROUND_Y + 6, obs.w / 2, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Body
  ctx.fillStyle = obs.color
  ctx.beginPath()
  ctx.roundRect(obs.x, obs.y, obs.w, obs.h, obs.flying ? 8 : 4)
  ctx.fill()

  // Label
  ctx.fillStyle = '#fff'
  ctx.font = `bold 9px "Space Mono", monospace`
  ctx.textAlign = 'center'
  ctx.fillText(obs.label, obs.x + obs.w / 2, obs.y + obs.h / 2 + 3)

  // Emoji on top
  ctx.font = `${obs.flying ? 14 : 16}px serif`
  ctx.textAlign = 'center'
  ctx.fillText(obs.emoji, obs.x + obs.w / 2, obs.y - 2)

  ctx.restore()
}

function drawGround(ctx, offset) {
  ctx.save()
  ctx.strokeStyle = '#0D0D0D'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, GROUND_Y + 10)
  ctx.lineTo(W, GROUND_Y + 10)
  ctx.stroke()

  // Dashes
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 1
  ctx.setLineDash([20, 30])
  for (let x = (-offset % 50); x < W; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, GROUND_Y + 10)
    ctx.lineTo(x + 20, GROUND_Y + 10)
    ctx.stroke()
  }
  ctx.setLineDash([])
  ctx.restore()
}

function drawCloud(ctx, x, y) {
  ctx.save()
  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  ctx.beginPath()
  ctx.arc(x, y, 18, 0, Math.PI * 2)
  ctx.arc(x + 20, y - 6, 22, 0, Math.PI * 2)
  ctx.arc(x + 44, y, 16, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

const PERSONAL_BEST_KEY = 'dinoGamePersonalBest'

// ─── Main Component ─────────────────────────────────────────────────────────
export default function DinoGame() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const rafRef = useRef(null)
  const [phase, setPhase] = useState('idle')   // idle | playing | dead
  const [score, setScore] = useState(0)
  const [hiscore, setHiscore] = useState(0)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      const savedBest = window.localStorage.getItem(PERSONAL_BEST_KEY)
      if (savedBest !== null) {
        const parsedBest = Number(savedBest)
        if (Number.isSafeInteger(parsedBest) && parsedBest >= 0) {
          setHiscore(parsedBest)
        }
      }
    } catch (error) {
      console.error('Unable to load the personal game score:', error)
      setStorageError('Your personal best could not be loaded from this browser.')
    }
  }, [])

  // Init game state
  const initState = useCallback(() => ({
    dinoY: GROUND_Y - DINO_H + 4,
    dinoVY: 0,
    onGround: true,
    jumping: false,
    frame: 0,
    frameTick: 0,
    speed: INITIAL_SPEED,
    score: 0,
    groundOffset: 0,
    obstacles: [],
    nextObsDist: 300 + Math.random() * 200,
    clouds: [
      { x: 100, y: 60 }, { x: 400, y: 40 }, { x: 650, y: 70 },
    ],
    isDead: false,
  }), [])

  const jump = useCallback(() => {
    const s = stateRef.current
    if (!s || !s.onGround) return
    s.dinoVY = JUMP_V
    s.onGround = false
    s.jumping = true
  }, [])

  const handleKey = useCallback((e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault()
      if (phase === 'idle' || phase === 'dead') return
      jump()
    }
  }, [phase, jump])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const startGame = useCallback(() => {
    if (stateRef.current && !stateRef.current.isDead) return
    stateRef.current = initState()
    setScore(0)
    setStorageError('')
    setPhase('playing')
  }, [initState])

  // ─── Game loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') {
      cancelAnimationFrame(rafRef.current)
      return
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const loop = () => {
      const s = stateRef.current
      if (!s) return

      // Physics
      s.dinoVY += GRAVITY
      s.dinoY += s.dinoVY
      if (s.dinoY >= GROUND_Y - DINO_H + 4) {
        s.dinoY = GROUND_Y - DINO_H + 4
        s.dinoVY = 0
        s.onGround = true
        s.jumping = false
      }

      // Speed & score
      s.speed = Math.min(s.speed + SPEED_INCREMENT, MAX_SPEED)
      s.score += 0.1
      s.groundOffset += s.speed

      // Clouds
      s.clouds = s.clouds.map(c => ({ ...c, x: c.x - s.speed * 0.3 }))
      if (s.clouds[0].x < -80) s.clouds.push({ x: W + 80, y: 30 + Math.random() * 60 })
      if (s.clouds[0].x < -80) s.clouds.shift()

      // Obstacles
      s.nextObsDist -= s.speed
      if (s.nextObsDist <= 0) {
        s.obstacles.push(randomObstacle(W + 40))
        s.nextObsDist = 280 + Math.random() * 320 - s.speed * 8
      }
      s.obstacles = s.obstacles
        .map(o => ({ ...o, x: o.x - s.speed }))
        .filter(o => o.x + o.w > -20)

      // Leg animation
      s.frameTick++
      if (s.frameTick % 8 === 0 && s.onGround) s.frame++

      // Collision
      const dinoHitbox = { x: DINO_X + 8, y: s.dinoY + 8, w: DINO_W - 16, h: DINO_H - 10 }
      for (const obs of s.obstacles) {
        const hit = (
          dinoHitbox.x < obs.x + obs.w - 4 &&
          dinoHitbox.x + dinoHitbox.w > obs.x + 4 &&
          dinoHitbox.y < obs.y + obs.h - 4 &&
          dinoHitbox.y + dinoHitbox.h > obs.y + 4
        )
        if (hit) {
          s.isDead = true
          const finalScore = Math.round(s.score * 10)
          setScore(finalScore)
          if (finalScore > hiscore) {
            setHiscore(finalScore)
            try {
              window.localStorage.setItem(PERSONAL_BEST_KEY, String(finalScore))
            } catch (error) {
              console.error('Unable to save the personal game score:', error)
              setStorageError('Your personal best could not be saved in this browser.')
            }
          }
          setPhase('dead')
          // Draw dead frame
          drawFrame(ctx, s)
          return
        }
      }

      drawFrame(ctx, s)
      setScore(Math.round(s.score * 10))
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  function drawFrame(ctx, s) {
    // Background
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#FAF7F2'
    ctx.fillRect(0, 0, W, H)

    // Clouds
    s.clouds.forEach(c => drawCloud(ctx, c.x, c.y))

    // Ground
    drawGround(ctx, s.groundOffset)

    // Obstacles
    s.obstacles.forEach(o => drawObstacle(ctx, o))

    // Dino
    drawDino(ctx, DINO_X, s.dinoY, s.frame, s.isDead)

    // Score HUD
    ctx.save()
    ctx.fillStyle = '#0D0D0D'
    ctx.font = `bold 14px "Space Mono", monospace`
    ctx.textAlign = 'right'
    ctx.fillText(`HI ${hiscore.toString().padStart(5, '0')}  ${Math.round(s.score * 10).toString().padStart(5, '0')}`, W - 16, 28)
    ctx.restore()

    // Speed badge
    const pct = Math.round(((s.speed - INITIAL_SPEED) / (MAX_SPEED - INITIAL_SPEED)) * 100)
    ctx.save()
    ctx.fillStyle = pct > 70 ? '#E8341A' : pct > 40 ? '#FF8C42' : '#CAED4C'
    ctx.beginPath()
    ctx.roundRect(16, 12, 72, 22, 100)
    ctx.fill()
    ctx.fillStyle = pct > 70 ? '#fff' : '#0D0D0D'
    ctx.font = `bold 11px "Space Grotesk", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText(`⚡ ${pct}% SPD`, 52, 27)
    ctx.restore()
  }

  // Tap/click to jump
  const handleCanvasClick = () => {
    if (phase === 'playing') jump()
  }

  return (
    <section id="game" style={{ padding: '7rem 4rem', background: '#121212', color: '#fff', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <style>{`
        #game .game-canvas-wrap { position: relative; }
        #game canvas { border-radius: 20px; display: block; width: 100%; max-width: ${W}px; cursor: pointer; }
        #game .game-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 20px; }
        #game .game-dead-panel { max-width: ${W}px; margin: 1.25rem auto 0; padding: 1.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.8rem; }
        @media (max-width: 860px) { #game { padding: 5rem 1.5rem; } }
        @media (max-width: 540px) { #game { padding: 4rem 1rem; } }
        .dino-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.75rem 1.8rem; border-radius: 100px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.9rem;
          cursor: pointer; border: none; transition: transform 0.2s, opacity 0.2s;
        }
        .dino-btn:hover { transform: scale(1.05); opacity: 0.92; }
        .dino-btn-primary { background: #CAED4C; color: #0D0D0D; }
        .dino-btn-secondary { background: rgba(255,255,255,0.1); color: #fff; border: 1.5px solid rgba(255,255,255,0.2); }
      `}</style>

      {/* Header */}
      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CAED4C', marginBottom: '0.8rem' }}>Mark Your Visit</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Debug Runner.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', maxWidth: 280, lineHeight: 1.6 }}>
          Play a quick round and beat your personal best. Help the dino dodge bugs, errors & crashes. <strong style={{ color: '#CAED4C' }}>Space / ↑ / tap</strong> to jump.
        </p>
      </div>
      <div style={{ maxWidth: W, margin: '-1rem auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#CAED4C', fontFamily: "'Space Mono', monospace", fontSize: '0.9rem', fontWeight: 700 }}>
          Personal best: {hiscore.toString().padStart(5, '0')}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>Your best is saved only in this browser.</span>
      </div>
      {storageError && (
        <p role="status" style={{ maxWidth: W, margin: '0 auto 1rem', color: '#FF8C42', fontSize: '0.82rem' }}>
          {storageError}
        </p>
      )}

      {/* Score bar */}
      {phase === 'playing' && (
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.1rem', color: '#CAED4C', fontWeight: 700 }}>
            {score.toString().padStart(5, '0')}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>pts</span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>HI: {hiscore.toString().padStart(5, '0')}</span>
        </div>
      )}

      {/* Canvas area */}
      <div className="game-canvas-wrap" style={{ maxWidth: W, margin: '0 auto' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          style={{ background: '#FAF7F2', borderRadius: 20, display: 'block', width: '100%', cursor: phase === 'playing' ? 'pointer' : 'default' }}
        />

        {/* IDLE overlay */}
        {phase === 'idle' && (
          <div className="game-overlay" style={{ background: 'rgba(13,13,13,0.82)', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: '#CAED4C', marginBottom: '1rem' }}>READY TO RUN</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Debug Runner
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: '1.8rem', textAlign: 'center', maxWidth: 300 }}>
              Dodge the bugs, errors & crashes.<br />How long can you survive?
            </p>
            <button className="dino-btn dino-btn-primary" onClick={startGame}>
              Start Running
            </button>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              Space / ↑ Arrow / Tap to jump
            </p>
          </div>
        )}

      </div>

      {phase === 'dead' && (
        <div className="game-dead-panel" role="group" aria-label="Final score">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.3rem', color: '#E8341A' }}>
              Crashed!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '1rem' }}>
              A bug got you. Final score:
            </p>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '2.2rem', fontWeight: 700, color: '#CAED4C' }}>
              {score.toString().padStart(5, '0')}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
              Personal best: <strong style={{ color: '#CAED4C' }}>{hiscore.toString().padStart(5, '0')}</strong>
            </p>

            <button className="dino-btn dino-btn-secondary" onClick={startGame} style={{ fontSize: '0.82rem' }}>
              Play Again
            </button>
        </div>
      )}

      {/* Obstacle legend */}
      <div style={{ maxWidth: W, margin: '1.5rem auto 0', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        {[...OBSTACLE_TYPES, FLYING_OBS].map((o, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '0.3rem 0.8rem' }}>
            <span style={{ fontSize: '0.9rem' }}>{o.emoji}</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Mono', monospace" }}>{o.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
