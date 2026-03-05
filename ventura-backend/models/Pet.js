const mongoose = require("mongoose")

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  energy: String,
  healthScore: Number,
  temperament: String,
  image: String
})

module.exports = mongoose.model("Pet", petSchema)