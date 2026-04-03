import React, { useState } from 'react'
import axios from "axios"
import { useNavigate ,Link } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username:"",
    email:"",
    password:"",
    role:"student"
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      form
    )

    alert("Registered Successfully")

    // redirect based on role
    if (res.data.user.role === "admin") {
      navigate("/admin")
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 w-96"
      >
        <h2 className="text-2xl mb-4">Register</h2>

        <input
          name="username"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <select
          name="role"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-blue-500 text-white w-full p-2">
          Register
        </button>
       <p className=' mt-3'>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  )
}

export default Register