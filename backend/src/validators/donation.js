
import { z } from 'zod'

export const donationConfirmationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(120),

  mobile: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      'Please enter a valid 10-digit mobile number',
    ),

  amount: z
    .number()
    .finite()
    .min(1, 'Donation amount must be at least Rs. 1')
    .max(10000000, 'Donation amount is too large'),

  utr: z
    .string()
    .trim()
    .min(6, 'Please enter a valid transaction reference')
    .max(100, 'Transaction reference is too long'),

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
})
