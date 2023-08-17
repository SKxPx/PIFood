const {
  createRecipeDB,
  getRecipeByID,
} = require("../controllers/recipesController");
const { filterDiets } = require("../controllers/filterController");

const postRecipeHandler = async (req, res) => {
  const { name, image, summary, healthScore, stepByStep, dietIDs} = req.body;
  try {
    const recipeDB = await createRecipeDB(
      name,
      image,
      summary,
      healthScore,
      stepByStep,
      dietIDs
    );
    res.status(201).json(recipeDB);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const recipeNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const filteredRecipes = await filterDiets(null, null, name);
    
    if (filteredRecipes.length === 0) {
      return res.status(404).send({ error: "No se encontraron recetas con el nombre proporcionado" });
    } else {
      return res.status(200).json(filteredRecipes);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const handlerFilterOption = async (req, res) => {
  const { option } = req.query;
  try {
    const response = await filterDiets(option, null, null);

    if (response.length === 0) {
      return res.status(404).send({ error: "No se encontraron recetas" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const handlerFilterDiet = async (req, res) => {
  const { diet } = req.query;
  try {
    const response = await filterDiets(null, diet, null);

    if(response.length === 0) {
      return res.status(400).send({ error: "No se encontraron recetas con esa dieta"})
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const recipeIDHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getRecipeByID(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  recipeNameHandler,
  handlerFilterOption,
  handlerFilterDiet,
  recipeIDHandler,
  postRecipeHandler,
};
