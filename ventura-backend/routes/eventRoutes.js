const express = require("express")
const router = express.Router()
const Event = require("../models/Event")

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

// Vote
router.post("/vote/:id", async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { $inc: { totalVotes: 1 } },
    { new: true }
  )

  res.json(event)
})

module.exports = router