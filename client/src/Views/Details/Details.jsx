import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeID } from "../../Redux/Actions";
import "./details.css";

const getColorClass = (score) => {
  if (score >= 0 && score <= 25) {
    return "health-red";
  } else if (score <= 50) {
    return "health-orange";
  } else if (score <= 75) {
    return "health-lightgreen";
  } else {
    return "health-green";
  }
};

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeID = useSelector((state) => state.recipeID);

  const healthColorClass = getColorClass(recipeID.healthScore);

  useEffect(() => {
    dispatch(getRecipeID(id));
  }, [id]);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div>
      <div className="details-container">
        <h1 className="recipe-title">{recipeID.name}</h1>
        <div className="view-info">
          <img
            src={recipeID.image}
            alt="imagenPlato"
            className="recipe-image"
          />
          <div className="recipe-info">
            <h4>{recipeID.id}</h4>
            <h3 className={`health ${healthColorClass}`}>
              {recipeID.healthScore}
            </h3>
            {recipeID.diets && (
              <div>
                <ul className="diets-list">
                  {recipeID.diets.map((d, index) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="preparation-title">
          <strong>Preparación paso a paso:</strong>
        </div>
        {recipeID.stepByStep && Array.isArray(recipeID.stepByStep) && (
          <div className="step-by-step">
            {recipeID.stepByStep.map((stepGroup, index) => (
              <div key={index} className="step-group">
                Paso {index + 1}:
                {stepGroup.map((step, subIndex) => (
                  <div key={subIndex} className="step">
                    {`Paso ${step.number}: ${step.step}`}
                    <ul className="ingredients-list">
                      Ingredientes:
                      {step.ingredients.map((ingredient, ingIndex) => (
                        <li key={ingIndex}>{ingredient.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
