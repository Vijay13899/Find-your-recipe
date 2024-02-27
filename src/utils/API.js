import axios from "axios";

export const apiKey = "f420688dbad047608318a1d4d40f5542";
export const searchRecipesByName = async (query, vegetarian) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=${
    vegetarian ? "vegetarian" : ""
  }`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("An error occurred while making the request:", error);
  }
};

export const searchRecipesByNutrients = async (nut, vegetarian) => {
  const url =
    `https://api.spoonacular.com/recipes/findByNutrients?` +
    `minCarbs=${nut.carbohydrates.min}&` +
    `maxCarbs=${nut.carbohydrates.max}&` +
    `minProtein=${nut.protein.min}&` +
    `maxProtein=${nut.protein.max}&` +
    `minFat=${nut.fat.min}&` +
    `maxFat=${nut.fat.max}&` +
    `minCalories=${nut.calories.min}&` +
    `maxCalories=${nut.calories.max}&` +
    `number=10&apiKey=${apiKey}` +
    `&diet=${vegetarian ? "vegetarian" : ""}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("An error occurred while making the request:", error);
  }
};

export const searchRecipesByIngredients = async (ingredients, vegetarian) => {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("An error occurred while making the request:", error);
  }
};
