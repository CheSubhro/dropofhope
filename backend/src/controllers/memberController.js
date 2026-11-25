
import Member from '../models/Member.js'
import { memberSchema } from '../validators/member.js'
import { generateId } from '../utils/generateId.js'

async function generateUniqueApplicationId() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const applicationId = generateId('MEM')

    const existingApplication = await Member.exists({
      applicationId,
    })

    if (!existingApplication) {
      return applicationId
    }
  }

  throw new Error('Unable to generate a unique application ID')
}

export async function createMemberApplication(req, res) {
  try {
    const validation = memberSchema.safeParse(req.body)

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

    const applicationId = await generateUniqueApplicationId()

    const application = await Member.create({
      ...data,
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
    console.error('Member application error:', error)

    if (
      error.code === 11000 &&
      error.keyPattern?.applicationId
    ) {
      return res.status(409).json({
        success: false,
        message: 'Application ID conflict. Please try again.',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your application. Please try again.',
    })
  }
}
