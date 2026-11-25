
import mongoose from 'mongoose'

const donorSchema = new mongoose.Schema(
  {
    donorId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 1,
      max: 250,
    },

    lastDonation: {
      type: Date,
      default: null,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
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

    health: {
      chronic: {
        type: Boolean,
        default: false,
      },

      surgeryTattoo: {
        type: Boolean,
        default: false,
      },

      medication: {
        type: Boolean,
        default: false,
      },
    },

    consent: {
      willing: {
        type: Boolean,
        required: true,
      },

      contactUse: {
        type: Boolean,
        required: true,
      },

      privacy: {
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
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

donorSchema.index({ district: 1 })
donorSchema.index({ bloodGroup: 1, status: 1 })

const Donor =
  mongoose.models.Donor || mongoose.model('Donor', donorSchema)

export default Donor
