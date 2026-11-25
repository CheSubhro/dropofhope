import Doctor from '../models/Doctor.js'
import { doctorApplicationSchema } from '../validators/doctor.js'
import { generateId } from '../utils/generateId.js'

async function generateUniqueApplicationId() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const applicationId = generateId('DOC')

    const existing = await Doctor.exists({ applicationId })

    if (!existing) {
      return applicationId
    }
  }

  throw new Error('Unable to generate a unique application ID')
}

export async function createDoctorApplication(req, res) {
  try {
    const validation = doctorApplicationSchema.safeParse(req.body)

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

    const normalizedRegistrationNumber = data.registrationNumber
      .trim()
      .toUpperCase()

    const existingDoctor = await Doctor.exists({
      registrationNumber: normalizedRegistrationNumber,
    })

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: 'An application with this registration number already exists.',
      })
    }

    const applicationId = await generateUniqueApplicationId()

    const application = await Doctor.create({
      ...data,
      registrationNumber: normalizedRegistrationNumber,
      state: 'West Bengal',
      applicationId,
      status: 'pending',
    })

    return res.status(201).json({
      success: true,
      application: {
        id: application.applicationId,
        status: application.status,
        createdAt: application.createdAt,
      },
    })
  } catch (error) {
    console.error('Doctor application error:', error)

    if (error.code === 11000) {
      if (error.keyPattern?.registrationNumber) {
        return res.status(409).json({
          success: false,
          message: 'An application with this registration number already exists.',
        })
      }

      if (error.keyPattern?.applicationId) {
        return res.status(409).json({
          success: false,
          message: 'Unable to generate a unique application ID. Please try again.',
        })
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your application. Please try again.',
    })
  }
}