import React from "react";

export default function RecipeIngredientEdit({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) {
  function handleChange(chnages) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...chnages });
  }

  return (
    <>
      <input
        type="text"
        value={ingredient.name}
        onChange={(e) => handleChange({ name: e.target.value })}
        className="recipe-edit-input"
      />
      <input
        type="text"
        value={ingredient.amount}
        onChange={(e) => handleChange({ amount: e.target.value })}
        className="recipe-edit-input"
      />
      <button
        className="btn btn-danger"
        onClick={() => {
          handleIngredientDelete(ingredient.id);
        }}
      >
        &times;
      </button>
    </>
  );
}
