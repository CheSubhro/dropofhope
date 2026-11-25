
import { z } from 'zod'

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

function calculateAge(value) {
  const [year, month, day] = value.split('-').map(Number)
  const today = new Date()

  let age = today.getFullYear() - year

  const birthdayPending =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)

  if (birthdayPending) {
    age--
  }

  return age
}

const dobSchema = z
  .string()
  .refine(isValidDateString, 'Enter a valid date in YYYY-MM-DD format')
  .refine(
    (value) => {
      const age = calculateAge(value)
      return age >= 18 && age <= 65
    },
    'Donor age must be between 18 and 65 years',
  )

const lastDonationSchema = z
  .union([z.string(), z.literal('')])
  .optional()
  .default('')
  .refine(
    (value) => value === '' || isValidDateString(value),
    'Enter a valid last donation date',
  )
  .refine(
    (value) => {
      if (!value) return true

      const [year, month, day] = value.split('-').map(Number)
      const donationDate = Date.UTC(year, month - 1, day)
      const today = new Date()
      const todayDate = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      )

      return donationDate <= todayDate
    },
    'Last donation date cannot be in the future',
  )
  .transform((value) => (value ? value : null))

export const donorSchema = z.object({
  fullName: z.string().trim().min(2).max(100),

  dob: dobSchema,

  gender: z.enum(['Male', 'Female', 'Other']),

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

  weight: z.coerce.number().min(1).max(250),

  lastDonation: lastDonationSchema,

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

  state: z.string().trim().min(1).max(100).optional().default('West Bengal'),

  district: z.string().trim().min(1).max(100),

  city: z.string().trim().min(1).max(100),

  pin: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN'),

  chronic: z.boolean().optional().default(false),

  surgeryTattoo: z.boolean().optional().default(false),

  medication: z.boolean().optional().default(false),

  willing: z.literal(true),

  contactUse: z.literal(true),

  privacy: z.literal(true),
})
