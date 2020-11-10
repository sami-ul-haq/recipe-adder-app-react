import "./css/App.css";
import RecipeList from "./components/RecipeList";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./components/RecipeEdit";

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact";

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
  const [selectedRecipeId, setselectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    setselectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  };

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setselectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleRecipeSelect(id) {
    setselectedRecipeId(id);
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  return (
    <>
      <RecipeContext.Provider value={recipeContextValue}>
        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </RecipeContext.Provider>
    </>
  );
}

export default App;
