import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 50,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    specialty: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    district: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      default: 'West Bengal',
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
    },

    email: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    hospital: {
      type: String,
      default: '',
      trim: true,
      maxlength: 150,
    },

    privacyConsent: {
      type: Boolean,
      required: true,
      default: false,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
)

doctorSchema.index({ registrationNumber: 1 }, { unique: true })
doctorSchema.index({ mobile: 1, createdAt: -1 })
doctorSchema.index({ status: 1, createdAt: -1 })

const Doctor = mongoose.model('Doctor', doctorSchema)

export default Doctor