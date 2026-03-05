"use client"

import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

interface VisionResult {
  eye_health: string
  skin_health: string
  dental_health: string
}

interface PainResult {
  pain_probability: string
  recommendation: string
}

export default function HealthPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [vision, setVision] = useState<VisionResult | null>(null)
  const [pain, setPain] = useState<PainResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const analyzeVision = async () => {
    if (!file) {
      alert("Please upload an image first 🐾")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    const res = await axios.post<VisionResult>(
      "http://localhost:8000/vision-diagnostics",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    setVision(res.data)
    setPain(null)
    setLoading(false)
  }

  const analyzePain = async () => {
    if (!file) {
      alert("Please upload an image first 🐾")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    const res = await axios.post<PainResult>(
      "http://localhost:8000/pain-detection",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    setPain(res.data)
    setVision(null)
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-4xl mb-8 text-[#F5B942]">
        AI Health & Pain Detection 🩺
      </h1>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="rounded-xl w-64 mb-6 border border-white/20"
        />
      )}

      <div className="space-x-4">
        <button
          onClick={analyzeVision}
          className="glow-btn px-6 py-2 rounded-xl"
        >
          Vision Diagnostics
        </button>

        <button
          onClick={analyzePain}
          className="glow-btn px-6 py-2 rounded-xl"
        >
          Pain Detection
        </button>
      </div>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-[#00C896]"
        >
          Analyzing image...
        </motion.p>
      )}

      {vision && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card mt-6 p-6"
        >
          <p>Eye: {vision.eye_health}</p>
          <p>Skin: {vision.skin_health}</p>
          <p>Dental: {vision.dental_health}</p>
        </motion.div>
      )}

      {pain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card mt-6 p-6"
        >
          <p>Pain Probability: {pain.pain_probability}</p>
          <p>Recommendation: {pain.recommendation}</p>
        </motion.div>
      )}
    </div>
  )
}