  import React, { useState, useEffect } from "react";
  import "./create.css";
  import { useDispatch, useSelector } from "react-redux";
  import { getDiets } from "../../Redux/Actions";
  import { postRecipe } from "../../Redux/Actions";

  const Create = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const [selectedDietIds, setSelectedDietIds] = useState([]);

    const [state, setState] = useState({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      stepByStep: "",
      diets: "",
    });

    const [errors, setErrors] = useState({
      name: "Nombre requerido",
      summary: "Descripción requerida",
      healthScore: "Nivel saludable",
      stepByStep: "Detalle el paso a paso",
      diets: "Seleccione al menos un tipo de receta",
    });

    const Validate = (input, name) => {
      const mensajesError = {
        name: "Nombre requerido",
        summary: "Descripción requerida",
        healthScore: "Nivel saludable requerido",
        stepByStep: "Detalle el paso a paso requerido",
        diets: "Seleccione al menos un tipo de receta",
      };
    
      if (input[name] !== "") {
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({ ...errors, [name]: mensajesError[name] });
      }
    };
    

    useEffect(() => {
      dispatch(getDiets());
    }, []);

    const handlerChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
      Validate(
        {
          ...state,
          [event.target.name]: event.target.value,
        },
        event.target.name
      );
    };

    const handleCheckboxChange = (event) => {
      const dietId = event.target.value;
      if (selectedDietIds.includes(dietId)) {
        setSelectedDietIds(selectedDietIds.filter(id => id !== dietId));
      } else {
        setSelectedDietIds([...selectedDietIds, dietId]);
      }
    };
    

    const handleSubmit = (event) => {
      event.preventDefault();
    
      const processedDietIds = selectedDietIds.map((selectedDiet) => {
        const diet = diets.find((diet) => diet.name === selectedDiet);
        return diet.id;
      });
    
      const recipeData = {
        name: state.name,
        image: state.image,
        summary: state.summary,
        healthScore: state.healthScore,
        stepByStep: state.stepByStep,
        dietIDs: processedDietIds,
      };
    
      dispatch(postRecipe(recipeData));
    };
    
    
    
    

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-center">
            <div className="input-cont">
              <label className="label-name">Nombre de la receta: </label>
              <input onChange={handlerChange} name="name" type="text" />
            </div>
            <span className="error-message">{errors.name}</span>
            <div className="input-cont">
              <label>Imagen: </label>
              <input onChange={handlerChange} name="image" type="text" />
            </div>
            <div className="input-cont">
              <label>Resumen de la receta: </label>
              <input onChange={handlerChange} name="summary" type="text" />
            </div>
            <span className="error-message">{errors.summary}</span>
            <div className="input-cont">
              <label>Nivel de comida saludable: </label>
              <input onChange={handlerChange} name="healthScore" type="number" />
            </div>
            <span className="error-message">{errors.healthScore}</span>
            <div className="input-cont">
              <label>Preparación paso a paso: </label>
              <input onChange={handlerChange} name="stepByStep" type="text" />
            </div>
            <span className="error-message">{errors.stepByStep}</span>
          </div>
          <div className="input-cont">
            <label>Tipo de Receta: </label>
            {diets.map((diet, index) => (
              <div className="checkbox-group " key={index}>
                <input
                  type="checkbox"
                  value={diet.name}
                  onChange={handleCheckboxChange}
                  checked={selectedDietIds.includes(diet.name)}
                />
                {diet.name}
              </div>
            ))}
            <span className="error-message">{errors.diets}</span>
          </div>
          <button className="submit-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    );
  };

  export default Create;