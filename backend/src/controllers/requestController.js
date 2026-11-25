
import BloodRequest from '../models/BloodRequest.js'
import { bloodRequestSchema } from '../validators/request.js'
import { generateId } from '../utils/generateId.js'

export async function createBloodRequest(req, res, next) {
  try {
    const parsed = bloodRequestSchema.safeParse(req.body)

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

    const requestData = {
      patientName: data.patientName,
      age: data.age,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      units: data.units,
      bloodType: data.bloodType,
      urgency: data.urgency,
      requiredDate: data.requiredDate
        ? new Date(`${data.requiredDate}T00:00:00.000Z`)
        : null,
      reason: data.reason,
      hospitalName: data.hospitalName,
      district: data.district,
      city: data.city,
      wardNumber: data.wardNumber,
      doctorName: data.doctorName,
      contactName: data.contactName,
      relation: data.relation,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      additionalInfo: data.additionalInfo,
      consent: {
        informationConfirmed: data.informationConfirmed,
        donorContactConsent: data.donorContactConsent,
        privacyConsent: data.privacyConsent,
        givenAt: new Date(),
      },
      status: 'pending',
    }

    let savedRequest = null

    for (let attempt = 0; attempt < 10; attempt++) {
      const requestId = generateId('REQ')

      try {
        savedRequest = await BloodRequest.create({
          ...requestData,
          requestId,
        })

        break
      } catch (error) {
        if (
          error.code === 11000 &&
          (error.keyPattern?.requestId || error.keyValue?.requestId)
        ) {
          continue
        }

        throw error
      }
    }

    if (!savedRequest) {
      return res.status(503).json({
        success: false,
        message: 'Unable to generate a request ID. Please try again.',
      })
    }

    return res.status(201).json({
      success: true,
      request: {
        id: savedRequest.requestId,
        status: savedRequest.status,
        createdAt: savedRequest.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}
