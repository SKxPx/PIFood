import React, { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../Redux/Actions";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Filters from "../../Components/Filters/Filters";
import Order from "../../Components/Order/Order";
import "./home.css";

const Home = () => {
  const ITEMS_PER_PAGE = 9;

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const recipesFiltered = useSelector((state) => state.recipesFiltered);
  const filters = useSelector((state) => state.filters);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (filters) {
      if (firstIndex >= recipesFiltered.length) return;
      const nextPageItems = recipesFiltered.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      setItems(nextPageItems);
      setCurrentPage(next_page);
    } else {
      if (firstIndex >= allRecipes.length) return;
      const nextPageItems = allRecipes.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      setItems(nextPageItems);
      setCurrentPage(next_page);
    }
  };

  const prevPage = () => {
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * ITEMS_PER_PAGE;
    if (firstIndex < 0) return;
    if (filters) {
      const prevPageItems = recipesFiltered.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      setItems(prevPageItems);
      setCurrentPage(prev_page);
    } else {
      const prevPageItems = allRecipes.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      setItems(prevPageItems);
      setCurrentPage(prev_page);
    }
  };

  useEffect(() => {
    dispatch(getRecipe());
  }, []);

  useEffect(() => {
    const firstIndex = currentPage * ITEMS_PER_PAGE;
    if (filters) {
      const nextPageItems = recipesFiltered.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      setItems(nextPageItems);
    } else {
      const nextPageItems = allRecipes.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
      );
      setItems(nextPageItems);
    }
  }, [currentPage, filters, allRecipes, recipesFiltered]);

  return (
    <div className="home-container">
      <h1 className="main-title">Recetas de comida</h1>
      <Filters />
      <Order />
      <div className="pagination">
        <button className="pagination-btn prev-btn" onClick={prevPage}>
          🢀 Prev
        </button>
        <SearchBar />
        <button className="pagination-btn next-btn" onClick={nextPage}>
          Next 🢂
        </button>
      </div>
      <div >
        <Cards recipes={items} />
      </div>
    </div>
  );
};

export default Home;
