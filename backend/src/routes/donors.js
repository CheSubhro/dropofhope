
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { createDonor } from '../controllers/donorController.js'

const router = Router()

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
  },
})

router.post('/', submitLimiter, createDonor)

export default router
