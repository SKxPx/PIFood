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
} from "./actions-types";
import axios from "axios";

export function postRecipe(info) {
  return async function (dispatch) {
    try {
      if (info.dietIDs.length !== 0) {
        const response = await axios.post(`http://localhost:3001/recipes/`, info);
        dispatch({ type: POST_RECIPE, payload: response.data });
        console.log(response.data)
        alert("Receta creada exitosamente");
      } else {
        alert("Selecciona al menos un tipo de receta");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
}


export function getRecipe() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes`);
      return dispatch({
        type: GET_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: RECIPE_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getFilterOption(option) {
  return async function (dispatch) {
    console.log(option);
    try {
      const response = await axios.get(`http://localhost:3001/recipes/option?option=${option}`);
      return dispatch({
        type: FILTER_OPTION,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getFilterDiet(diet) {
  return async function (dispatch) {
    console.log(diet);
    try {
      const response = await axios.get(`http://localhost:3001/recipes/diet?diet=${diet}`);
      return dispatch({
        type: FILTER_DIET,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getRecipeID(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_RECIPE_ID,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: GET_DIETS,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}


export function reset() {
  return function (dispatch) {
    return dispatch({
      type: RESET,
    });
  };
}

export function paginate(order) {
  return async function (dispatch) {
    dispatch({
      type: PAGINATE,
      payload: order,
    });
  };
}

export function orderAction(type, sortedItem) {
  return {
    type: SET_ORDER,
    payload: sortedItem,
  };
}