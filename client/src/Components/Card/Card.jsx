import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const getColorClass = (score) => {
  if (score >= 0 && score <= 25) {
    return 'health-red';
  } else if (score <= 50) {
    return 'health-orange';
  } else if (score <= 75) {
    return 'health-lightgreen';
  } else {
    return 'health-green';
  }
};

const Card = (props) => {
  const healthColorClass = getColorClass(props.healthScore);
  return (
    <Link className="card-link" to={`/details/${props.id}`}>
      <div className="card-container">
        <div className="card-details">
          <img className="img-recipe" src={props.image} alt="imagenPlato" />
          <div className="info">
            <div className="card-title">
              <h3>{props.name}</h3>
            </div>
            <h3 className={`health ${healthColorClass}`}>{props.healthScore}</h3>
          </div>
          <h4>
            <ul className="list">
              {props.diets.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ul>
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
