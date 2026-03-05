"use client"

import { useState } from "react"
import axios from "axios"

export default function Match() {
  const [score, setScore] = useState(null)

  const getMatch = async () => {
    try {
      const res = await axios.post("http://localhost:8000/compatibility", {
        activity: "low",
        kids: true
      })

      setScore(res.data.compatibility_score)

    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-6">Find Your Perfect Match</h1>

      <button
        onClick={getMatch}
        className="bg-[#F5B942] text-black px-6 py-3 rounded-lg"
      >
        Calculate Compatibility
      </button>

      {score && (
        <div className="mt-8 text-3xl text-[#00C896]">
          Compatibility Score: {score}%
        </div>
      )}
    </div>
  )
}