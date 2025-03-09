import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateRecipe  from "./pages/Createrecipe";
import Savedrecipes  from "./pages/Savedrecipe";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setSavedRecipes={setSavedRecipes} />
      <Routes>
      
        {/* Redirect to Login if not logged in */}
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={ <Home setIsLoggedIn={setIsLoggedIn} /> } />
        <Route path="/createrec" element={<CreateRecipe/>} />
        <Route path="/savedrec" element={<Savedrecipes/>} />
        <Route path="/about" element={ <About /> } />
        <Route path="/contactus" element={ <Contactus /> } />
      </Routes>
    </Router>
  );
}

export default App;