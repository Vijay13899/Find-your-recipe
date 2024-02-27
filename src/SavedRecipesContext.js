import { createContext, useEffect, useState } from "react";

export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    const savedRecipesFromStorage =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipesFromStorage);
  }, []);
  console.log(savedRecipes);
  const isRecipeSaved = (recipe) => {
    return savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id);
  };
  const saveRecipe = (recipe) => {
    if (!isRecipeSaved(recipe)) {
      setSavedRecipes([...savedRecipes, recipe]);
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    }
  };

  const unsaveRecipe = (recipe) => {
    // Remove the recipe with the specified id from saved recipes
    const updatedRecipes = savedRecipes.filter(
      (savedRecipe) => savedRecipe.id !== recipe.id
    );

    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  return (
    <SavedRecipesContext.Provider
      value={{ savedRecipes, saveRecipe, unsaveRecipe, isRecipeSaved }}
    >
      {children}
    </SavedRecipesContext.Provider>
  );
};
