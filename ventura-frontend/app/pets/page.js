"use client"

import { useEffect, useState } from "react"
import { fetchPets } from "../../services/api"
import PetCard from "../../components/PetCard"

export default function PetsPage() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await fetchPets()
        setPets(data)
      } catch {
        setError("Failed to load pets")
      } finally {
        setLoading(false)
      }
    }

    loadPets()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F2C] text-white flex items-center justify-center">
        Loading pets...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0F2C] text-red-500 flex items-center justify-center">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white p-10">
      <h1 className="text-4xl mb-8 text-center">
        Meet Our Companions 🐾
      </h1>

      {pets.length === 0 ? (
        <div className="text-center text-gray-400">
          No pets available yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  )
}