import React from "react";
import Ingredient from "./Ingredient";

export default function InredientList({ ingredients }) {
  const ingredientElements = ingredients.map((ingredient) => (
    <Ingredient key={ingredient.id} {...ingredient} />
  ));
  return <div className="ingredient-grid">{ingredientElements}</div>;
}
