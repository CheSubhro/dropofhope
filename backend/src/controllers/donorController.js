
import Donor from '../models/Donor.js'
import { donorSchema } from '../validators/donor.js'
import { generateId } from '../utils/generateId.js'

export async function createDonor(req, res, next) {
  try {
    // Validate request body
    const parsed = donorSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    const data = parsed.data

    // Check existing mobile number
    const existingDonor = await Donor.findOne({
      mobile: data.mobile,
    }).lean()

    if (existingDonor) {
      return res.status(409).json({
        success: false,
        message: 'This mobile number is already registered.',
      })
    }

    const donorData = {
      fullName: data.fullName,
      dob: new Date(`${data.dob}T00:00:00.000Z`),
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      weight: data.weight,
      lastDonation: data.lastDonation
        ? new Date(`${data.lastDonation}T00:00:00.000Z`)
        : null,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,
      state: data.state,
      district: data.district,
      city: data.city,
      pin: data.pin,

      health: {
        chronic: data.chronic,
        surgeryTattoo: data.surgeryTattoo,
        medication: data.medication,
      },

      consent: {
        willing: data.willing,
        contactUse: data.contactUse,
        privacy: data.privacy,
        givenAt: new Date(),
      },

      status: 'pending',
    }

    // Generate unique donor ID and save
    let savedDonor = null

    for (let attempt = 0; attempt < 10; attempt++) {
      const donorId = generateId('DOH')

      try {
        savedDonor = await Donor.create({
          ...donorData,
          donorId,
        })

        break
      } catch (error) {
        if (error.code === 11000) {
          // Mobile number collision
          if (
            error.keyPattern?.mobile ||
            error.keyValue?.mobile
          ) {
            return res.status(409).json({
              success: false,
              message: 'This mobile number is already registered.',
            })
          }

          // Donor ID collision: generate another ID
          if (
            error.keyPattern?.donorId ||
            error.keyValue?.donorId
          ) {
            continue
          }
        }

        throw error
      }
    }

    if (!savedDonor) {
      return res.status(503).json({
        success: false,
        message: 'Unable to generate a donor ID. Please try again.',
      })
    }

    // Return only public-safe information
    return res.status(201).json({
      success: true,
      donorId: savedDonor.donorId,
    })
  } catch (error) {
    next(error)
  }
}
