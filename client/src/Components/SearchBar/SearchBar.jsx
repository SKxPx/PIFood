import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../Redux/Actions";
import "./searchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const searchByName = (event) => {
    event.preventDefault();
    dispatch(getRecipesByName(name));
  };

  return (
    <div className="search-bar-container">
      <div>
        <input className="search-input" onChange={handleChange} name="name" type="text" />
        <button className="search-button" onClick={searchByName}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
