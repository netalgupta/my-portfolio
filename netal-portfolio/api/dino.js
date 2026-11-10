import { randomUUID } from 'node:crypto'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const MAX_SCORE = 1_000_000
const MAX_NAME_LENGTH = 20

function getDatabaseInstance() {
  const existingApp = getApps().find(app => app.name === 'dino-leaderboard')
  if (existingApp) return getDatabase(existingApp)

  const databaseURL = process.env.FIREBASE_DATABASE_URL
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT
  if (!databaseURL || !serviceAccountJson) {
    throw new Error('Firebase server credentials are not configured.')
  }

  let serviceAccount
  try {
    serviceAccount = JSON.parse(serviceAccountJson)
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT must contain valid JSON.')
  }

  const app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL,
  }, 'dino-leaderboard')
  return getDatabase(app)
}

function validateLeaderboard(value) {
  if (!Array.isArray(value)) throw new Error('Stored leaderboard is invalid.')

  const validEntries = value.every(entry => (
    entry &&
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    Number.isSafeInteger(entry.score) &&
    entry.score >= 0 &&
    typeof entry.date === 'string'
  ))
  if (!validEntries) throw new Error('Stored leaderboard contains an invalid score.')

  return [...value].sort((a, b) => b.score - a.score).slice(0, 5)
}

async function getStats(database) {
  const snapshot = await database.ref('dinoGame').get()
  const stats = snapshot.val() || {}
  const plays = stats.plays ?? 0
  if (!Number.isSafeInteger(plays) || plays < 0) {
    throw new Error('Stored play count is invalid.')
  }

  return {
    plays,
    leaderboard: validateLeaderboard(stats.leaderboard ?? []),
  }
}

function parseBody(body) {
  if (typeof body !== 'string') return body || {}
  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (req.method === 'POST') {
    const origin = req.headers.origin
    const host = req.headers.host
    try {
      if (!origin || !host || new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
        return res.status(403).json({ error: 'Cross-origin requests are not allowed.' })
      }
    } catch {
      return res.status(403).json({ error: 'Cross-origin requests are not allowed.' })
    }
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json(await getStats(getDatabaseInstance()))
    }

    const body = parseBody(req.body)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'Request body must be valid JSON.' })
    }

    if (body.action === 'play') {
      const database = getDatabaseInstance()
      const result = await database.ref('dinoGame/plays').transaction(current => {
        const plays = current ?? 0
        if (!Number.isSafeInteger(plays) || plays < 0 || plays >= Number.MAX_SAFE_INTEGER) {
          throw new Error('Stored play count is invalid.')
        }
        return plays + 1
      })
      if (!result.committed) throw new Error('Unable to record the play count.')
      return res.status(200).json({ plays: result.snapshot.val() })
    }

    if (body.action === 'score') {
      if (!Number.isSafeInteger(body.score) || body.score < 0 || body.score > MAX_SCORE) {
        return res.status(400).json({ error: 'Score is outside the allowed range.' })
      }

      const name = typeof body.name === 'string' ? body.name.trim() : ''
      if (name.length > MAX_NAME_LENGTH || /[\u0000-\u001f\u007f]/.test(name)) {
        return res.status(400).json({ error: 'Name must be 20 characters or fewer.' })
      }

      const entry = {
        id: randomUUID(),
        name: name || 'Anonymous',
        score: body.score,
        date: new Date().toISOString(),
      }
      const database = getDatabaseInstance()
      const result = await database.ref('dinoGame/leaderboard').transaction(current => {
        const scores = current ?? []
        return validateLeaderboard([...scores, entry])
      })
      if (!result.committed) throw new Error('Unable to save the score.')
      return res.status(200).json({
        leaderboard: validateLeaderboard(result.snapshot.val() ?? []),
      })
    }

    return res.status(400).json({ error: 'Unknown game activity action.' })
  } catch (error) {
    console.error('Dino game API request failed:', error)
    return res.status(500).json({ error: 'Shared game stats are temporarily unavailable.' })
  }
}
