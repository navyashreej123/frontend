import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);  // <-- Move inside component
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

  const handeldel = async (recipeID) => {
    try {
      await axios.delete(
        `https://backend-6lg1.onrender.com/recipes/savedRecipes/${userID}/${recipeID}`
      );
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeID)
      );
      setExpandedIds((prev) => prev.filter((id) => id !== recipeID)); // also remove from expandedIds if deleted
      console.log("Recipe deleted successfully");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const toggleDetails = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

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

              <div className="button-group">
                <button className="viewbtn" onClick={() => toggleDetails(recipe._id)}>
                  {expandedIds.includes(recipe._id) ? "Hide Details" : "View Details"}
                </button>
                <button className="delbut" onClick={() => handeldel(recipe._id)}>
                  Delete
                </button>
              </div>

              {expandedIds.includes(recipe._id) && (
                <div className="instructions">
                  <h3 className="savedres">Ingredients</h3>
                  <ul className="savedreslist">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <h3 className="savedres">Instructions</h3>
                  <p>{recipe.instructions}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
