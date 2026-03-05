"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          "http://localhost:5000/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setStats(res.data)
      } catch (error) {
        console.error("Dashboard Error:", error)
      }
    }

    fetchStats()
  }, [])

  if (!stats)
    return (
      <div className="min-h-screen bg-[#0A0F2C] text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    )

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white p-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl mb-10 text-center"
      >
        Impact Dashboard 📊
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card text-center"
        >
          <h2 className="text-xl mb-2">Total Pets</h2>
          <p className="text-3xl text-[#F5B942]">
            {stats.totalPets}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card text-center"
        >
          <h2 className="text-xl mb-2">Total Users</h2>
          <p className="text-3xl text-[#00C896]">
            {stats.totalUsers}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
          className="glass-card text-center"
        >
          <h2 className="text-xl mb-2">Total Adoptions</h2>
          <p className="text-3xl text-white">
            {stats.totalAdoptions}
          </p>
        </motion.div>

      </div>
    </div>
  )
}