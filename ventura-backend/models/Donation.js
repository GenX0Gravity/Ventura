const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    message: {
      type: String,
      default: ""
    },

    persona: {
      type: String,
      enum: ["Adoptor", "Donor"],
      required: true
    },

    stripePaymentId: {
      type: String
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Donation", donationSchema)