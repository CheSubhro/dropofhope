import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import donorRoutes from './routes/donors.js'
import campRoutes from './routes/camps.js'
import requestRoutes from './routes/requests.js'
import memberRoutes from './routes/members.js'
import donationRoutes from './routes/donations.js'
import doctorRoutes from './routes/doctors.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
)
app.use(express.json({ limit: '100kb' }))

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'DropOfHope API is running' })
})

app.use('/api/donors', donorRoutes)
app.use('/api/camps', campRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/donation-confirmations', donationRoutes)
app.use('/api/doctors', doctorRoutes)


// URL
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' })
})


app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, message: 'Something went wrong' })
})

export default app