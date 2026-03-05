"use client"
import { useState } from "react"
import axios from "axios"

export default function Concierge() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:8000/concierge", {
      message
    })

    setResponse(res.data.response)
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white flex flex-col items-center justify-center">
      
      <h1 className="text-3xl mb-4">Ventura AI Concierge 🤖</h1>

      <input
        placeholder="Ask about your pet..."
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 text-black m-2"
      />

      <button
        onClick={sendMessage}
        className="bg-[#F5B942] px-6 py-2 rounded"
      >
        Ask AI
      </button>

      {response && (
        <div className="mt-6 text-[#00C896]">
          {response}
        </div>
      )}
    </div>
  )
}