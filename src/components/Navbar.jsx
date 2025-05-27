import React from 'react'
import { useNavigate } from "react-router-dom";
import Home from '../pages/Home'
import CreateRecipe from '../pages/Createrecipe'
const Navbar = ({ setSavedRecipes }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    alert("WANT TO LOGOUT!!!.....")
    localStorage.clear();
    setSavedRecipes([]);
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbg">
        <div>
          <ul className="navbar-nav ">
            <li><img src="/Designer.jpg" alt="" className='logo' /></li>
            <li><a href="/" className="brandname">FoodyTale</a></li>
          </ul>
        </div>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navitems">
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

          </div>
        </div>
        <div>
          <ul className="navbar-nav ">
            <a id='logbut' href="/login">Login </a><a id='regbut' href="/register"> Register</a>
            <button className='outbutt' onClick={handleLogout} >Logout</button>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
