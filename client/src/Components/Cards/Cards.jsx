import React from 'react'
import Card from '../Card/Card'
import './cards.css'

const Cards = ({recipes}) => {
  return (
    <div className='card-cont'>
      {recipes.map((recipe) => <Card name={recipe.name} image={recipe.image} diets={recipe.diets} id={recipe.id} healthScore={recipe.healthScore} key={recipe.id} />)}
    </div>
  );
};

export default Cards