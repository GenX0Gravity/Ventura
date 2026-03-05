const express = require("express")
const router = express.Router()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET)
const Donation = require("../models/Donation")

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { donorName, email, amount, message, persona } = req.body

    // 1️⃣ Create donation with pending status
    const donation = await Donation.create({
      donorName,
      email,
      amount,
      message,
      persona,
      paymentStatus: "pending"
    })

    // 2️⃣ Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr"
    })

    // 3️⃣ Save Stripe ID inside donation
    await Donation.findByIdAndUpdate(donation._id, {
      stripePaymentId: paymentIntent.id
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation._id
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Payment failed" })
  }
})

module.exports = router