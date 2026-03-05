const express = require("express")
const router = express.Router()
const Pet = require("../models/Pet")

router.get("/", async (req, res) => {
  const pets = await Pet.find()
  res.json(pets)
})

module.exports = router