const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
  donorName: String,
  amount: Number,
  message: String
})

module.exports = mongoose.model("Donation", donationSchema)