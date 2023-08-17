const { Diets } = require("../db");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

const getDietsApi = async () => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=&number=5222&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  const DietsApi = response.data.results ? response.data.results.map((diet) => diet.diets) : [];
  let allDiets = [];
  DietsApi.forEach((diet) => diet.forEach((dieta) => allDiets.push(dieta)));
  return allDiets;
};

const createDietsDB = async () => {
  const dietas = await getDietsApi();
  
  for (const diet of dietas) {
    await Diets.findOrCreate({
      where: {
        name: diet,
      },
    });
  }
};

const getAllDiet = async () => {
    await createDietsDB();

    const allDiets = await Diets.findAll();
    return allDiets
}

module.exports = getAllDiet;