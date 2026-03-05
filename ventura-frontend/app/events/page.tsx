"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

interface EventType {
  _id: string
  name: string
  description: string
  totalVotes: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/events")
      .then(res => setEvents(res.data))
  }, [])

  const vote = async (id: string) => {
    await axios.post(`http://localhost:5000/events/vote/${id}`)
    const res = await axios.get("http://localhost:5000/events")
    setEvents(res.data)
  }

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-4xl mb-8 text-[#F5B942]">
        Boopathons 🐶🎉
      </h1>

      {events.map(event => (
        <motion.div
          key={event._id}
          whileHover={{ scale: 1.03 }}
          className="glass-card mb-6 p-6"
        >
          <h2 className="text-2xl">{event.name}</h2>
          <p className="mb-4">{event.description}</p>

          <p className="text-[#00C896] mb-3">
            Votes: {event.totalVotes}
          </p>

          <button
            onClick={() => vote(event._id)}
            className="glow-btn px-6 py-2 rounded-xl"
          >
            Vote (₹10)
          </button>
        </motion.div>
      ))}
    </div>
  )
}