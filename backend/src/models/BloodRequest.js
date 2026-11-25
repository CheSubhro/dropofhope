
import mongoose from 'mongoose'

const bloodRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },

    units: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },

    bloodType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    urgency: {
      type: String,
      required: true,
      enum: ['immediate', 'scheduled'],
    },

    requiredDate: {
      type: Date,
      default: null,
    },

    reason: {
      type: String,
      default: '',
      trim: true,
      maxlength: 150,
    },

    hospitalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    district: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    wardNumber: {
      type: String,
      default: '',
      trim: true,
      maxlength: 50,
    },

    doctorName: {
      type: String,
      default: '',
      trim: true,
      maxlength: 100,
    },

    contactName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    relation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    whatsapp: {
      type: String,
      default: '',
      trim: true,
    },

    additionalInfo: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },

    consent: {
      informationConfirmed: {
        type: Boolean,
        required: true,
      },

      donorContactConsent: {
        type: Boolean,
        required: true,
      },

      privacyConsent: {
        type: Boolean,
        required: true,
      },

      givenAt: {
        type: Date,
        default: Date.now,
      },
    },

    status: {
      type: String,
      enum: ['pending', 'verified', 'fulfilled', 'rejected', 'cancelled'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

bloodRequestSchema.index({ district: 1, bloodGroup: 1, status: 1 })
bloodRequestSchema.index({ urgency: 1, requiredDate: 1 })
bloodRequestSchema.index({ createdAt: -1 })

const BloodRequest =
  mongoose.models.BloodRequest ||
  mongoose.model('BloodRequest', bloodRequestSchema)

export default BloodRequest
