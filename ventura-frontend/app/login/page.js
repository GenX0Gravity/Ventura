"use client"
import { useState } from "react"
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password
    })

    localStorage.setItem("token", res.data.token)
    alert("Login Successful")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F2C] text-white">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 m-2 text-black"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 m-2 text-black"
      />
      <button
        onClick={handleLogin}
        className="bg-[#F5B942] px-6 py-2 rounded"
      >
        Login
      </button>
    </div>
  )
}