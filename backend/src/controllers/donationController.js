
import DonationConfirmation from '../models/DonationConfirmation.js'
import { donationConfirmationSchema } from '../validators/donation.js'
import { generateId } from '../utils/generateId.js'

async function generateUniqueConfirmationId() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const confirmationId = generateId('DNC')

    const existing = await DonationConfirmation.exists({
      confirmationId,
    })

    if (!existing) {
      return confirmationId
    }
  }

  throw new Error('Unable to generate a unique confirmation ID')
}

export async function createDonationConfirmation(req, res) {
  try {
    const validation = donationConfirmationSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Please check the submitted information',
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    const data = validation.data

    const normalizedUtr = data.utr.trim().toUpperCase()

    const existingUtr = await DonationConfirmation.exists({
      utr: normalizedUtr,
    })

    if (existingUtr) {
      return res.status(409).json({
        success: false,
        message: 'This transaction reference has already been submitted.',
      })
    }

    const confirmationId = await generateUniqueConfirmationId()

    const confirmation = await DonationConfirmation.create({
      ...data,
      utr: normalizedUtr,
      confirmationId,
      status: 'pending',
    })

    return res.status(201).json({
      success: true,
      message:
        'Thank you for sharing your donation details. Our team will verify your transaction and contact you.',
      confirmation: {
        id: confirmation.confirmationId,
        status: confirmation.status,
        createdAt: confirmation.createdAt,
      },
    })
  } catch (error) {
    console.error('Donation confirmation error:', error)

    if (error.code === 11000) {
      if (error.keyPattern?.utr) {
        return res.status(409).json({
          success: false,
          message: 'This transaction reference has already been submitted.',
        })
      }

      if (error.keyPattern?.confirmationId) {
        return res.status(409).json({
          success: false,
          message: 'Unable to generate a unique confirmation ID. Please try again.',
        })
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your donation details. Please try again.',
    })
  }
}
