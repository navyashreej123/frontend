import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import '../App.css'

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://backend-6lg1.onrender.com/recipes/home");
        setRecipes(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log("Error fetching recipes:", err);
        setRecipes([]);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        if (!userID) return;
        const response = await axios.get(
          `https://backend-6lg1.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.log("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://backend-6lg1.onrender.com/recipes/home", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes || []);
    } catch (err) {
      console.log("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const toggleDetails = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  return (
    <div>
      {/* Bootstrap Carousel */}
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="100">
            <img src="/ban.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="/Sou-Ind.jpg" className="d-block width" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/veg-image.jpg" className="d-block width" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          id="slidebut"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          id="slidebut"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h1 className="head1">Recipes</h1>

      <div className="card">
        <ul className="recipe-grid">
          {Array.isArray(recipes) ? (
            recipes.map((recipe) => (
              <li key={recipe._id} className="recipe-card border">
                <h2>{recipe.name}</h2>

                <img className="img" src={recipe.imageUrl} alt={recipe.name} />

                <button
                  className="butt"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>

                <p>{recipe.description}</p>

                <p>Cooking Time: {recipe.cookingTime} minutes</p>

                <button
                  className="butt view-details-btn"
                  onClick={() => toggleDetails(recipe._id)}
                >
                  {expandedIds.includes(recipe._id) ? "Hide Details" : "View Details"}
                </button>

                {expandedIds.includes(recipe._id) && (
                  <div className="instructions">
                    <h3 className="savedres">Ingredients</h3>
                    <ul className="savedres">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>

                    <h3 className="savedres">Instructions</h3>
                    <p>{recipe.instructions}</p>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>Loading recipes...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
