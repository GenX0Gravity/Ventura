import axios from "axios"

const BACKEND_URL = "http://localhost:5000"
const AI_URL = "http://localhost:8000"

export const fetchPets = async () => {
  const res = await axios.get(`${BACKEND_URL}/pets`)
  return res.data
}

export const getCompatibility = async (data) => {
  const res = await axios.post(`${AI_URL}/compatibility`, data)
  return res.data
}