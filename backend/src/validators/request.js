
import { z } from 'zod'

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function getIndiaDateString() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  )

  return `${values.year}-${values.month}-${values.day}`
}

const mobileSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')

const optionalMobileSchema = z
  .string()
  .trim()
  .regex(/^$|^[6-9]\d{9}$/, 'Enter a valid WhatsApp number')
  .optional()
  .default('')

const requiredDateSchema = z
  .string()
  .optional()
  .default('')
  .refine(
    (value) => value === '' || isValidDateString(value),
    'Enter a valid required date',
  )

export const bloodRequestSchema = z
  .object({
    patientName: z.string().trim().min(2).max(100),

    age: z.coerce.number().int().min(0).max(120),

    gender: z.string().trim().min(1).max(30),

    bloodGroup: z.enum([
      'A+',
      'A-',
      'B+',
      'B-',
      'O+',
      'O-',
      'AB+',
      'AB-',
    ]),

    units: z.coerce.number().int().min(1).max(50),

    bloodType: z.string().trim().min(1).max(100),

    urgency: z.enum(['immediate', 'scheduled']),

    requiredDate: requiredDateSchema,

    reason: z.string().trim().max(150).optional().default(''),

    hospitalName: z.string().trim().min(2).max(150),

    district: z.string().trim().min(1).max(100),

    city: z.string().trim().min(1).max(100),

    wardNumber: z.string().trim().max(50).optional().default(''),

    doctorName: z.string().trim().max(100).optional().default(''),

    contactName: z.string().trim().min(2).max(100),

    relation: z.string().trim().min(1).max(50),

    mobile: mobileSchema,

    whatsapp: optionalMobileSchema,

    additionalInfo: z.string().trim().max(1000).optional().default(''),

    informationConfirmed: z.literal(true),

    donorContactConsent: z.literal(true),

    privacyConsent: z.literal(true),
  })
  .superRefine((data, ctx) => {
    if (data.urgency === 'scheduled' && !data.requiredDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['requiredDate'],
        message: 'Required date is necessary for scheduled requests',
      })
    }

    if (data.requiredDate) {
      if (data.requiredDate < getIndiaDateString()) {
        ctx.addIssue({
          code: 'custom',
          path: ['requiredDate'],
          message: 'Required date cannot be in the past',
        })
      }
    }
  })
