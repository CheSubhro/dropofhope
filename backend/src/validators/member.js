
import { z } from 'zod'

const interestsList = [
  'Blood Camps',
  'Donor Awareness',
  'Social Media',
  'Fundraising',
  'Emergency Response',
  'Photography/Design',
]

const membershipTypes = [
  'volunteer',
  'associate',
  'life',
]

const professions = [
  'Student',
  'Teacher',
  'Healthcare Professional',
  'Private Employee',
  'Government Employee',
  'Business Owner',
  'Self Employed',
  'Homemaker',
  'Other',
]

const genders = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say',
]

const bloodGroups = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
]

const hoursOptions = [
  '1-2',
  '3-5',
  '6+',
]

function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

const optionalEmail = z
  .string()
  .trim()
  .max(150)
  .refine(
    (value) => value === '' || z.email().safeParse(value).success,
    'Please enter a valid email address',
  )

const optionalMobile = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || /^[6-9]\d{9}$/.test(value),
    'Please enter a valid 10-digit mobile number',
  )

export const memberSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Full name must contain at least 3 characters')
    .max(120),

  
dateOfBirth: z
  .string()
  .min(1, 'Date of birth is required')
  .refine(
    (value) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false
      }

      const date = new Date(`${value}T00:00:00.000Z`)

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
      )
    },
    'Please enter a valid date of birth',
  )
  .refine(
    (value) => calculateAge(value) >= 18,
    'Applicants must be at least 18 years old',
  )
  .refine(
    (value) => calculateAge(value) <= 120,
    'Please enter a valid date of birth',
  ),

  gender: z.enum(genders),

  bloodGroup: z.union([
    z.enum(bloodGroups),
    z.literal(''),
  ]),

  profession: z.enum(professions),

  mobile: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      'Please enter a valid 10-digit mobile number',
    ),

  whatsapp: optionalMobile,

  email: optionalEmail,

  state: z.literal('West Bengal'),

  district: z
    .string()
    .trim()
    .min(1, 'District is required')
    .max(100),

  locality: z
    .string()
    .trim()
    .min(1, 'Locality is required')
    .max(200),

  pinCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Please enter a valid 6-digit PIN code'),

  membershipType: z.enum(membershipTypes),

  interests: z
    .array(z.enum(interestsList))
    .min(1, 'Please select at least one area of interest')
    .max(interestsList.length),

  weeklyHours: z.union([
    z.enum(hoursOptions),
    z.literal(''),
  ]),

  volunteerExperience: z
    .string()
    .trim()
    .max(2000)
    .default(''),

  reason: z
    .string()
    .trim()
    .max(2000)
    .default(''),

  informationAccurate: z.literal(true, {
    error: 'Please confirm that the information is accurate',
  }),

  followRules: z.literal(true, {
    error: 'You must agree to follow the organisation rules',
  }),

  privacyConsent: z.literal(true, {
    error: 'Privacy consent is required',
  }),
})
