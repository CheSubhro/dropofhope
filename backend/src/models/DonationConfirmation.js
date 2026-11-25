
import mongoose from 'mongoose'

const donationConfirmationSchema = new mongoose.Schema(
  {
    confirmationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
      max: 10000000,
    },

    utr: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: 100,
    },

    email: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

donationConfirmationSchema.index({ mobile: 1, createdAt: -1 })
donationConfirmationSchema.index({ status: 1, createdAt: -1 })

const DonationConfirmation = mongoose.model(
  'DonationConfirmation',
  donationConfirmationSchema,
)

export default DonationConfirmation
