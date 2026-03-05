"use client"

import { useState } from "react"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!)

function DonationForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [form, setForm] = useState({
    donorName: "",
    email: "",
    amount: 0,
    message: "",
    persona: "Donor"
  })

  const handleSubmit = async (
  e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault()

    if (!stripe || !elements) return

    // 1️⃣ Create payment intent
    const res = await axios.post(
      "http://localhost:5000/payments/create-payment-intent",
      form
    )

    const { clientSecret } = res.data

    // 2️⃣ Confirm card payment
    const card = elements.getElement(CardElement)

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card!,
        billing_details: {
          name: form.donorName,
          email: form.email
        }
      }
    })

    if (result.error) {
      alert(result.error.message)
    } else {
      alert("🎉 Donation Successful!")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 glass-card">
      <h2 className="text-2xl mb-4 text-[#F5B942]">
        Support Ventura 🐾
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Full Name"
          className="w-full p-2 text-black"
          onChange={(e) =>
            setForm({ ...form, donorName: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full p-2 text-black"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Amount (INR)"
          className="w-full p-2 text-black"
          onChange={(e) =>
            setForm({ ...form, amount: Number(e.target.value) })
          }
        />
<label htmlFor="persona" className="block text-sm mb-1">
  Select Persona
</label>
<select
  id="persona"
  className="w-full p-2 text-black"
  onChange={(e) =>
    setForm({ ...form, persona: e.target.value })
  }
>
  <option value="Donor">Donor</option>
  <option value="Adoptor">Adoptor</option>
</select>

        <textarea
          placeholder="Message (optional)"
          className="w-full p-2 text-black"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <div className="p-3 bg-white rounded">
          <CardElement />
        </div>

        <button className="glow-btn w-full py-3 rounded-xl">
          Donate Now 💖
        </button>

      </form>
    </div>
  )
}

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white p-10">
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>

      {/* Organization Video */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl mb-4 text-[#00C896]">
          Our Story
        </h2>

        <video
          controls
          className="mx-auto rounded-xl w-full max-w-2xl"
        >
          <source src="/videos/ventura-story.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}