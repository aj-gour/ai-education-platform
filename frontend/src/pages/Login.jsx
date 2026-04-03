import React, { useState } from 'react'
import axios from "axios"
import { useNavigate ,Link } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email:"",
    password:""
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
      "http://localhost:3000/api/auth/login",
      form

    )

    console.log("ROLE:", res.data.role)

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("role", res.data.role)

    if(res.data.role === "admin"){
      navigate("/admin")
    }else{
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 w-96"
      >
        <h2 className="text-2xl mb-4">Login</h2>

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

        <button className="bg-green-500 text-white w-full p-2">
          Login
        </button>
          <p className=' mt-3'> if you dont have an account? <Link to="/">Register here</Link></p>
      </form>
     
    </div>
  )
}

export default Login