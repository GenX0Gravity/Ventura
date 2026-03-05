const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: String,
  totalVotes: { type: Number, default: 0 }
})

module.exports = mongoose.model("Event", eventSchema)