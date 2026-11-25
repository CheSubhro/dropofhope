
import express from 'express'
import rateLimit from 'express-rate-limit'

import {
  createMemberApplication,
} from '../controllers/memberController.js'

const router = express.Router()

const memberSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many applications submitted. Please try again later.',
  },
})

router.post(
  '/',
  memberSubmissionLimiter,
  createMemberApplication,
)

export default router
