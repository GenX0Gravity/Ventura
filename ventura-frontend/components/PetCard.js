"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function PetCard({ pet }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="glass-card hover:shadow-[0_0_25px_#F5B942] duration-300 overflow-hidden"
    >
      {/* Pet Image */}
      <div className="relative h-60 w-full rounded-lg overflow-hidden">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Pet Info */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-[#F5B942]">
          {pet.name}
        </h2>

        <p className="text-gray-300 mt-1">
          Breed: {pet.breed}
        </p>

        <p className="text-gray-300">
          Energy: {pet.energy}
        </p>

        <p className="text-[#00C896] font-medium mt-2">
          Health Score: {pet.healthScore}
        </p>
      </div>
    </motion.div>
  )
}