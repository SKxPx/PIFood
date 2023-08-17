import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from "../../Redux/Actions"; 
import "./order.css"

const Order = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);

  const [nameOrder, setNameOrder] = useState("asc"); 

  const handlerClick = (event) => {
    event.preventDefault();
    const sortedItem = [...allRecipes.map((item) => ({ ...item }))]; 
    if (event.target.name === "asc") {
      sortedItem.sort((a, b) => a.healthScore - b.healthScore);
    } else if (event.target.name === "des") {
      sortedItem.sort((a, b) => b.healthScore - a.healthScore);
    } 
    
    if (event.target.name === "alfa") {
      if (nameOrder === "asc") {
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        setNameOrder("des");
      } else {
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        setNameOrder("asc");
      }
    } 
    
    if (event.target.name === "hea") {
      sortedItem.sort((a, b) => b.healthScore - a.healthScore);
    }

    dispatch(orderAction(event.target.name, sortedItem));
  }

  return (
    <div className="order-container">
      <button className="order-button" onClick={handlerClick} name="asc">
        Ascendente
      </button>
      <button className="order-button" onClick={handlerClick} name="des">
        Descendente
      </button>
      <button className="order-button" onClick={handlerClick} name="alfa">
        Ordenar por Nombre
      </button>
      <button className="order-button" onClick={handlerClick} name="hea">
        Health Score
      </button>
    </div>
  );
};

export default Order;