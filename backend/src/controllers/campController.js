
import Camp from '../models/Camp.js'
import { campSchema } from '../validators/camp.js'
import { generateId } from '../utils/generateId.js'

export async function createCamp(req, res, next) {
  try {
    const parsed = campSchema.safeParse(req.body)

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

    const campData = {
      orgName: data.orgName,
      orgType: data.orgType,
      contactName: data.contactName,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,
      campName: data.campName,
      date: new Date(`${data.date}T00:00:00.000Z`),
      startTime: data.startTime,
      endTime: data.endTime,
      expectedDonors: data.expectedDonors,
      state: data.state,
      district: data.district,
      city: data.city,
      pin: data.pin,
      venue: data.venue,
      facilities: data.facilities,
      notes: data.notes,
      declaration: data.declare,
      privacyConsent: data.privacy,
      status: 'pending',
    }

    let savedCamp = null

    for (let attempt = 0; attempt < 10; attempt++) {
      const applicationId = generateId('CAMP')

      try {
        savedCamp = await Camp.create({
          ...campData,
          applicationId,
        })

        break
      } catch (error) {
        if (
          error.code === 11000 &&
          (error.keyPattern?.applicationId ||
            error.keyValue?.applicationId)
        ) {
          continue
        }

        throw error
      }
    }

    if (!savedCamp) {
      return res.status(503).json({
        success: false,
        message: 'Unable to generate an application ID. Please try again.',
      })
    }

    return res.status(201).json({
      success: true,
      applicationId: savedCamp.applicationId,
    })
  } catch (error) {
    next(error)
  }
}
