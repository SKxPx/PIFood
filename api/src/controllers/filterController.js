const {
  getRecipeByName,
  getRecipeAPI,
  getRecipeDB,
} = require("./recipesController");

const filterApiDb = async ( option, name ) => {
  const db = await getRecipeDB(name);
  const api = await getRecipeAPI(name);
  const allResponse = await getRecipeByName(name);

  if (option === "db") {
    if(db.length === 0) throw new Error("No se encuentran datos en la base de datos");
    else return db;
  } 
  if (option === "api") {
    if(api.length === 0) throw new Error("No se encuentran datos en la api");
    else return api;
  } 
  
  return allResponse;
};

const filterDiets = async ( option, diet, name ) => {
  const filters = await filterApiDb( option, name);
  if (diet) {
    return filters.filter((recipe) => recipe.diets.includes(diet));
  }
  return filters;
}

module.exports = {
  filterDiets,
};
