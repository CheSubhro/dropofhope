
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

const dateSchema = z
  .string()
  .refine(isValidDateString, 'Enter a valid proposed date')
  .refine(
    (value) => value > getIndiaDateString(),
    'Camp date must be after today',
  )

const timeSchema = z
  .string()
  .regex(/^$|^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid time')
  .optional()
  .default('')

export const campSchema = z
  .object({
    orgName: z.string().trim().min(2).max(150),

    orgType: z.string().trim().min(1).max(100),

    contactName: z.string().trim().min(2).max(100),

    mobile: mobileSchema,

    whatsapp: optionalMobileSchema,

    email: z
      .union([
        z.string().trim().email('Enter a valid email address'),
        z.literal(''),
      ])
      .optional()
      .default('')
      .transform((value) => value.toLowerCase()),

    campName: z.string().trim().max(150).optional().default(''),

    date: dateSchema,

    startTime: timeSchema,

    endTime: timeSchema,

    expectedDonors: z.coerce
      .number()
      .int('Expected donors must be a whole number')
      .min(1)
      .max(100000),

    state: z.string().trim().min(1).max(100).optional().default('West Bengal'),

    district: z.string().trim().min(1).max(100),

    city: z.string().trim().min(1).max(100),

    pin: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN'),

    venue: z.string().trim().min(3).max(300),

    facilities: z
      .array(z.string().trim().min(1).max(100))
      .max(30)
      .optional()
      .default([]),

    notes: z.string().trim().max(500).optional().default(''),

    declare: z.literal(true),

    privacy: z.literal(true),
  })
  .superRefine((data, ctx) => {
    if (
      data.startTime &&
      data.endTime &&
      data.endTime <= data.startTime
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['endTime'],
        message: 'End time must be after start time',
      })
    }
  })
