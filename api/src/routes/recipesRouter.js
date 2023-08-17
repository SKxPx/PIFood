const { Router } = require("express");
const {
  recipeNameHandler,
  handlerFilterOption,
  handlerFilterDiet,
  recipeIDHandler,
  postRecipeHandler,
} = require("../handlers/recipesHandler");
const recipesRouter = Router();

recipesRouter
    .get("/", recipeNameHandler)
    .get("/option", handlerFilterOption)
    .get("/diet", handlerFilterDiet)
    .get("/:id", recipeIDHandler)
    .post("/", postRecipeHandler);

module.exports = recipesRouter;