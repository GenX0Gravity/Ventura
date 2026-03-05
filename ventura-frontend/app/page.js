"use client"

import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="bg-[#0A0F2C] text-white min-h-screen flex flex-col justify-center items-center">
      
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center"
      >
        We Don’t Find Owners.
        <span className="text-[#F5B942]"> We Find Soulmates.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-lg text-gray-300 text-center"
      >
        AI Compatibility • Predictive Health • 24/7 Concierge
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-[#F5B942] text-black px-6 py-3 rounded-lg shadow-lg hover:shadow-[0_0_30px_#F5B942] transition duration-300"
      >
        Find My Match
      </motion.button>

    </div>
  )
}