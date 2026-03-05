const mongoose = require("mongoose")

const adoptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  compatibilityScore: Number,
  status: { type: String, default: "pending" }
})

module.exports = mongoose.model("Adoption", adoptionSchema)