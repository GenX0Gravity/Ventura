const express = require("express")
const router = express.Router()
const Adoption = require("../models/Adoption")

router.post("/", async (req, res) => {
  const adoption = new Adoption(req.body)
  await adoption.save()
  res.status(201).json(adoption)
})

module.exports = router