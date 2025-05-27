import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useCookies } from "react-cookie";
import Login from "./Login";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://backend-6lg1.onrender.com/auth/register", {username,email,password});

      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      alert("Registration Completed! Now login.");
      navigate("/home");

    } catch (error) {
      if (error.response && error.response.status === 400) {
        const message = error.response.data.message || "Registration failed. Try again.";
        alert(message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login" className="links">Login</Link></p>
    </div>
  );
};

export default Register;