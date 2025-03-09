import React from 'react'
import { useNavigate } from "react-router-dom";
import Home from '../pages/Home'
import CreateRecipe  from '../pages/Createrecipe'
const Navbar = ({setSavedRecipes}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out..."); 
    localStorage.removeItem("token");  
    localStorage.removeItem("username"); 
    localStorage.removeItem("savedRecipes");
    setSavedRecipes([]); 
    navigate("/login"); 
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbg">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img src="/Designer.jpg" alt="" className='logo'/>
            <a class="brandname" href="/">FoodyTale</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 navitems">
              <li >
                <a aria-current="page" href="/home">Home</a>
              </li>
              <li >
                <a aria-current="page" href="/createrec">CreateRecipe</a>
              </li>
              <li >
                <a aria-current="page" href="/savedrec">SaveRecipe</a>
              </li>
              <li >
                <a aria-current="page" href="/about">About</a>
              </li>
              <li >
                <a aria-current="page" href="/contactus">ContactUS</a>
              </li>
            </ul>
            <a id='logbut' href="/login">Login </a><a id='regbut' href="/register"> Register</a>
            <button className='outbutt' onClick={handleLogout} >Logout</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
