const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "user"
  },
  adoptedPet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet"
  }
})

module.exports = mongoose.model("User", userSchema)