import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

const Login = ({ setIsLoggedIn }) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://backend-6lg1.onrender.com/auth/login", { email, password });
      window.localStorage.setItem("userID", res.data.userID);
      window.localStorage.setItem("email", email);
      setCookies("access_token", res.data.token);
      setIsLoggedIn(true);
      navigate("/home");
      alert("LOGGEDIN SUCESSFULLY WECOME!!!");
    } catch (error) {
      alert("Invalid Credentials");
    }
  }

  return (
    <div>
      <div className="container">
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>New user? <Link to="/register" className='links'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login;