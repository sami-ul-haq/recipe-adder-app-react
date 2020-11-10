import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(chnages) {
    handleRecipeChange(recipe.id, { ...recipe, ...chnages });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit-remove-button-container">
        <button
          className="btn recipe-edit-remove-button"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit-details-grid">
        <label htmlFor="name" className="recipe-edit-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="recipe-edit-input"
        />
        <label htmlFor="cookTime" className="recipe-edit-label">
          CookTime
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipe.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
          className="recipe-edit-input"
        />
        <label htmlFor="servings" className="recipe-edit-label">
          Servings
        </label>
        <input
          type="text"
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
          className="recipe-edit-input"
        />
        <label htmlFor="instruction" className="recipe-edit-label">
          Instructions
        </label>
        <textarea
          name="instruction"
          id="instruction"
          className="recipe-edit-input"
          onChange={(e) => handleChange({ instructions: e.target.value })}
          value={recipe.instructions}
        />
      </div>
      <br />
      <label className="recipe-edit-label">Ingredients</label>
      <div className="recipe-edit-ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {/* Ingredient Component */}
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient}
          />
        ))}
      </div>
      <div className="recipe-edit-add-ingredient-btn-container">
        <button
          className="btn btn-primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
