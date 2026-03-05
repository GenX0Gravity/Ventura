// 1️⃣ Load dotenv FIRST
require("dotenv").config()

// 2️⃣ Import packages
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// 3️⃣ Import routes
const authRoutes = require("./routes/authRoutes")
const adoptionRoutes = require("./routes/adoptionRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const donationRoutes = require("./routes/donationRoutes")
const eventRoutes = require("./routes/eventRoutes") // 🆕 Boopathons

// 4️⃣ Import models (for dashboard + donation stats)
const Pet = require("./models/Pet")
const User = require("./models/User")
const Adoption = require("./models/Adoption")
const Donation = require("./models/Donation")

// 5️⃣ Import middleware
const authMiddleware = require("./middleware/authMiddleware")

// 6️⃣ Create app
const app = express()

// 7️⃣ Middleware
app.use(cors())
app.use(express.json())

// 8️⃣ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err))

// 9️⃣ Routes
app.use("/auth", authRoutes)
app.use("/adoptions", adoptionRoutes)
app.use("/payments", paymentRoutes)
app.use("/donations", donationRoutes)
app.use("/events", eventRoutes) // 🆕 Gamified voting

// 🔟 Dashboard route (protected)
app.get("/dashboard/stats", authMiddleware, async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalAdoptions = await Adoption.countDocuments()

    res.json({
      totalPets,
      totalUsers,
      totalAdoptions
    })
  } catch (error) {
    res.status(500).json({ message: "Dashboard error" })
  }
})

// 🆕 Live Donation Counter Route
app.get("/donations/stats", async (req, res) => {
  try {
    const total = await Donation.aggregate([
      { $match: { paymentStatus: "completed" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ])

    res.json({
      totalAmount: total[0]?.totalAmount || 0
    })
  } catch (error) {
    res.status(500).json({ message: "Donation stats error" })
  }
})

// Test route
app.get("/", (req, res) => {
  res.send("Ventura Backend Running 🚀")
})

// 1️⃣1️⃣ Start server LAST
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})