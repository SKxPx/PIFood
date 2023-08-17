import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getFilterDiet, getFilterOption, reset } from "../../Redux/Actions";
import "./filters.css";

const Filters = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [filterOption, setFilterOption] = useState();
  const [dietFilter, setDietFilter] = useState();

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  const handlerFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "filtro") {
      setFilterOption(value);
      dispatch(getFilterOption( value, filterOption)); 
    } else if (name === "filtroPorDieta") {
      setDietFilter(value);
      dispatch(getFilterDiet( value, dietFilter));
    }
  };
  

  const handlerReset = () => {
    setFilterOption("0");
    setDietFilter("0");
    dispatch(reset());
  };

  return (
    <div className="filters-container">
      <button className="reset-button" onClick={handlerReset}>Reset</button>
      <select className="filter-select" onChange={handlerFilterChange} name="filtro" id="order" value={filterOption}>
        <option value="0">Filtro por api/db</option>
        <option value="api">api</option>
        <option value="db">db</option>
      </select>
      <select className="diet-select"  onChange={handlerFilterChange} name="filtroPorDieta" id="diet" value={dietFilter}>
        <option value="0">Filtro por dieta</option>
        {diets.map((diet, index) => (
          <option key={index} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;