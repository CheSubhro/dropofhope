import express from 'express'
import rateLimit from 'express-rate-limit'

import {
  createDoctorApplication,
} from '../controllers/doctorController.js'

const router = express.Router()

const doctorSubmissionLimiter = rateLimit({
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
  doctorSubmissionLimiter,
  createDoctorApplication,
)

export default router