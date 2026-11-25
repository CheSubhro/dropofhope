
import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema(
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

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      default: '',
      trim: true,
    },

    profession: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
    },

    whatsapp: {
      type: String,
      default: '',
      trim: true,
    },

    email: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },

    state: {
      type: String,
      required: true,
      default: 'West Bengal',
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      required: true,
      trim: true,
    },

    pinCode: {
      type: String,
      required: true,
      match: /^\d{6}$/,
    },

    membershipType: {
      type: String,
      required: true,
      enum: ['volunteer', 'associate', 'life'],
    },

    interests: {
      type: [String],
      required: true,
      validate: {
        validator: (values) => values.length > 0,
        message: 'At least one interest is required',
      },
    },

    weeklyHours: {
      type: String,
      default: '',
    },

    volunteerExperience: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },

    reason: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },

    informationAccurate: {
      type: Boolean,
      required: true,
      default: false,
    },

    followRules: {
      type: Boolean,
      required: true,
      default: false,
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

memberSchema.index({ mobile: 1, status: 1 })
memberSchema.index({ membershipType: 1, status: 1 })
memberSchema.index({ createdAt: -1 })

const Member = mongoose.model('Member', memberSchema)

export default Member
