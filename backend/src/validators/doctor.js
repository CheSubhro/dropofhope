import { z } from 'zod'

export const doctorApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(120),

  registrationNumber: z
    .string()
    .trim()
    .min(3, 'Please enter a valid registration number')
    .max(50),

  qualification: z
    .string()
    .trim()
    .min(2, 'Please enter your qualification')
    .max(150),

  specialty: z
    .string()
    .trim()
    .min(2, 'Please select your specialty')
    .max(120),

  district: z
    .string()
    .trim()
    .min(2, 'Please select your district')
    .max(100),

  state: z
    .string()
    .trim()
    .default('West Bengal'),

  mobile: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      'Please enter a valid 10-digit mobile number',
    ),

  email: z
    .string()
    .trim()
    .max(150)
    .refine(
      (value) => value === '' || z.email().safeParse(value).success,
      'Please enter a valid email address',
    )
    .optional()
    .default(''),

  hospital: z
    .string()
    .trim()
    .max(150)
    .optional()
    .default(''),

  privacyConsent: z
    .boolean()
    .refine(
      (value) => value === true,
      'Privacy consent is required',
    ),
})