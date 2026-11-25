
import express from 'express'
import rateLimit from 'express-rate-limit'

import {
  createDonationConfirmation,
} from '../controllers/donationController.js'

const router = express.Router()

const donationSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
  },
})

router.post(
  '/',
  donationSubmissionLimiter,
  createDonationConfirmation,
)

export default router
