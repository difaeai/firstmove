// ----------------------------------------------------------------------------
// Production server for Firebase App Hosting (Cloud Run).
//
// App Hosting builds the site with `npm run build` (producing ./dist) and then
// runs `npm start`, expecting a server that listens on the PORT it provides.
// This serves the static build and falls back to index.html for client-side
// routes (so /admin and deep links work).
// ----------------------------------------------------------------------------
import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, 'dist')

const app = express()

// Hashed build assets — safe to cache aggressively.
app.use(
  '/assets',
  express.static(join(dist, 'assets'), { maxAge: '1y', immutable: true }),
)

// Other static files (logo, favicon, etc.) — short cache.
app.use(express.static(dist, { index: false, maxAge: '1h' }))

// SPA fallback: every other route serves index.html (React Router takes over).
app.use((_req, res) => {
  res.set('Cache-Control', 'no-cache')
  res.sendFile(join(dist, 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`First Option Worldwide site listening on port ${port}`)
})
