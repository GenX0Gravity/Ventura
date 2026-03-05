"use client"

import { useEffect, useState } from "react"
import axios from "axios"
interface Donor {
  _id: string
  donorName: string
  amount: number
  message?: string
  persona: "Donor" | "Adoptor"
}
export default function Leaderboard() {
  const [donors, setDonors] = useState<Donor[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/donations/leaderboard")
      .then(res => setDonors(res.data))
  }, [])

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl mb-6 text-[#F5B942]">
        Top Donors 🏆
      </h1>

      {donors.map((d, i) => (
        <div key={i} className="glass-card mb-4">
          {d.donorName} — ₹{d.amount}
        </div>
      ))}
    </div>
  )
}