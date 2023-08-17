import {
  POST_RECIPE,
  RECIPE_BY_NAME,
  GET_RECIPE,
  GET_RECIPE_ID,
  GET_DIETS,
  SET_ORDER,
  FILTER_OPTION,
  FILTER_DIET,
  RESET,
  PAGINATE,
} from "../Actions/actions-types";

let initialState = {
  allRecipes: [],
  recipesData: [],
  recipeDB: [],
  recipeID: [],
  diets: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case POST_RECIPE:
      return {
        ...state,
        recipeDB: action.payload.status,
      };
      break;
    case GET_RECIPE:
      return {
        ...state,
        allRecipes: action.payload,
        recipesData: action.payload,
      };
      break;
    case RECIPE_BY_NAME:
      return {
       ...state,
        allRecipes: action.payload,
      };
      break;
    case FILTER_OPTION:
      return {
        ...state,
        allRecipes: action.payload,
      };
      break;
    case FILTER_DIET:
      return {
        ...state,
        allRecipes: action.payload,
      };
      break;
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
      break;
    case GET_RECIPE_ID:
      return {
        ...state,
        recipeID: action.payload,
      };
      break;
    case RESET:
      return {
        ...state,
        allRecipes: [...state.recipesData],
      };

    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        action.payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;

      if (state.filters) {
        if (firstIndex >= state.recipesFiltered.length) {
          return { ...state };
        }

        const recipesFilteredPage = state.recipesFiltered.slice(
          firstIndex,
          firstIndex + ITEMS_PER_PAGE
        );
        return {
          ...state,
          recipes: recipesFilteredPage,
          currentPage: action.payload === "next" ? next_page : prev_page,
        };
      }

      if (action.payload === "next" && firstIndex >= state.recipes.length) {
        return { ...state };
      } else if (action.payload === "prev" && prev_page < 0) {
        return { ...state };
      }

      const recipesPage = state.recipes.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      return {
        ...state,
        currentPage: action.payload === "next" ? next_page : prev_page,
      };
    case SET_ORDER:
      return {
        ...state,
        allRecipes: action.payload,
      };

    default:
      return state;
      break;
  }
}

export default rootReducer;
