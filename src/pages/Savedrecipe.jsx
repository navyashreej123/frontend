import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID"; 
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        if (!userID) return; 
        const response = await axios.get(
          `https://backend-6lg1.onrender.com/recipes/savedRecipes/${userID}`
        );
        console.log("API Response:", response.data); 
        setSavedRecipes(response.data.savedRecipes || []); 
      } catch (err) {
        console.log("Error fetching saved recipes:", err);
        setSavedRecipes([]); 
      }
    };

    fetchSavedRecipes();
  }, [userID]); 

  const handeldel = async (recipeID) =>{
    try {
      await axios.delete(`https://backend-6lg1.onrender.com/recipes/savedRecipes/${userID}/${recipeID}`);
      setSavedRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe._id !== recipeID));
      console.log("Recipe deleted successfully");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  }
  return (
    <div>
      <h1 className="savcen">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes found.</p> 
      ) : (
        <ul className="ressav">
          {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <img className="savimg" src={recipe.imageUrl} alt={recipe.name} />
              <p className="des">{recipe.description}</p>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              <button className="delbut" onClick={() => handeldel(recipe._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;