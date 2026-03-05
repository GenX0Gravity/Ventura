const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    res.status(201).json({ message: "User created successfully" })

  } catch (error) {
    res.status(400).json({ message: "Signup failed" })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      { userId: user._id },
      "ventura_secret",
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (error) {
    res.status(400).json({ message: "Login failed" })
  }
})

module.exports = router