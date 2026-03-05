"use client"

import { motion } from "framer-motion"

export default function MatchScore({ score }) {

  const getColor = () => {
    if (score >= 85) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center shadow-xl mt-6"
    >
      <h2 className="text-2xl mb-4">Compatibility Score</h2>

      <div className={`text-6xl font-bold ${getColor()}`}>
        {score}%
      </div>

      <p className="mt-4 text-gray-300">
        {score >= 85 && "Perfect soulmate match! 🐾"}
        {score >= 70 && score < 85 && "Great compatibility!"}
        {score < 70 && "Moderate match. Consider lifestyle alignment."}
      </p>
    </motion.div>
  )
}