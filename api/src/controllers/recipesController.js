const { Recipes, Diets } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const data = require("../../../../foodComplexSearch.json");

const { API_KEY } = process.env;

const createRecipeDB = async (
  name,
  image,
  summary,
  healthScore,
  stepByStep,
  dietIDs
) => {
  console.log(dietIDs);
  try {
    const newRecipe = await Recipes.create({
      name: name,
      image: image,
      summary: summary,
      healthScore: healthScore,
      stepByStep: stepByStep,
    });

    if (dietIDs && dietIDs.length > 0) {
      const selectedDiets = await Diets.findAll({
        where: {
          id: dietIDs,
        },
      });

      await newRecipe.setDiets(selectedDiets);
    }

    return newRecipe;
  } catch (error) {
    throw new Error("Error creating recipe: " + error.message);
  }
};

const getRecipeAPI = async (name) => {
  if (name) {
    const petition = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&apiKey=${API_KEY}`
      )
    ).data;
    const apiMap = petition.results
      ? petition.results.map((recipe) => ({
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          diets: recipe.diets,
        }))
      : [];
    return apiMap;
  }
  const petition = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=&addRecipeInformation=true`,
      {
        params: {
          apiKey: API_KEY,
          number: 100,
          addRecipeInformation: true,
        },
      }
    )
  ).data;
  const apiMap = petition.results
    ? petition.results.map((recipe) => ({
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        diets: recipe.diets,
        healthScore: recipe.healthScore,
      }))
    : [];
  return apiMap;
};

const getRecipeDB = async (name) => {
  if (name) {
    const recipeDB = await Recipes.findAll({
      attributes: ["id", "name", "image", "healthScore"],
      include: {
        model: Diets,
        attributes: ["name"],
      },
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    const formattedRecipes = recipeDB.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      diets: recipe.diets.map((diet) => diet.name),
      healthScore: recipe.healthScore,
    }));

    return formattedRecipes;
  }

  const recipeDB = await Recipes.findAll({
    attributes: ["id", "name", "image", "healthScore"],
    include: {
      model: Diets,
      attributes: ["name"],
    },
  });

  const formattedRecipes = recipeDB.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    image: recipe.image,
    diets: recipe.diets.map((diet) => diet.name),
    healthScore: recipe.healthScore,
  }));

  return formattedRecipes;
};

const getRecipeByName = async (name) => {
  const recipeDB = await getRecipeDB(name);
  const recipeApi = await getRecipeAPI(name);
  const allRecipe = [...recipeDB, ...recipeApi];
  return allRecipe;
};

const getRecipeByID = async (id) => {
  if (isNaN(id)) {
    const recipeDB = await Recipes.findByPk(id);
    return recipeDB;
  } else {
    const response = (
      await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?&addRecipeInformation=true?&apiKey=${API_KEY}`
      )
    ).data;
    const recipe = {
      id: response.id,
      name: response.title,
      image: response.image,
      summary: response.summary,
      healthScore: response.healthScore,
      stepByStep: response.analyzedInstructions.map((steps) =>
        steps.steps.map((instruction) => ({
          number: instruction.number,
          step: instruction.step,
          ingredients: instruction.ingredients.map((ingredient) => ({
            name: ingredient.name,
            image: ingredient.image,
          })),
        }))
      ),
      diets: response.diets,
    };
    return recipe;
  }
};

module.exports = {
  getRecipeAPI,
  getRecipeDB,
  createRecipeDB,
  getRecipeByName,
  getRecipeByID,
};
