import "./css/App.css";
import RecipeList from "./components/RecipeList";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const RecipeContext = createContext();

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions:
      "1. Put Salt On Chiken\n2. Put Salt On Chiken\n3. Put Salt On Chiken",
    ingredients: [
      {
        id: 1,
        name: "chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "salt",
        amount: "as you wish",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Beef",
    servings: 5,
    cookTime: "5:00",
    instructions: "1. Wash Whole Beef\n2. Put Salt On sss\n3. Put Salt On sds",
    ingredients: [
      {
        id: 1,
        name: "beef",
        amount: "3 pounds",
      },
      {
        id: 2,
        name: "salt",
        amount: "2 Tble Spoons",
      },
    ],
  },
];

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: "Instr",
      ingredients: [
        {
          id: uuidv4(),
          name: "Name",
          amount: "1 Tbs",
        },
      ],
    };
    setRecipes([...recipes, newRecipe]);
  };

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
  };

  return (
    <>
      <RecipeContext.Provider value={recipeContextValue}>
        <RecipeList recipes={recipes} />
      </RecipeContext.Provider>
    </>
  );
}

export default App;
