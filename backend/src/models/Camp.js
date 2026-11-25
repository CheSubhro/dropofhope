
import mongoose from 'mongoose'

const campSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    orgName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    orgType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    contactName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
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

    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
    },

    campName: {
      type: String,
      default: '',
      trim: true,
      maxlength: 150,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      default: '',
    },

    endTime: {
      type: String,
      default: '',
    },

    expectedDonors: {
      type: Number,
      required: true,
      min: 1,
      max: 100000,
    },

    state: {
      type: String,
      default: 'West Bengal',
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    pin: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    facilities: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500,
    },

    declaration: {
      type: Boolean,
      required: true,
    },

    privacyConsent: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

campSchema.index({ district: 1, date: 1 })
campSchema.index({ mobile: 1 })
campSchema.index({ status: 1, createdAt: -1 })

const Camp =
  mongoose.models.Camp || mongoose.model('Camp', campSchema)

export default Camp
