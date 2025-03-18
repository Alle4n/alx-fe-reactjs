import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
        <Route 
          path="/add-recipe" 
          element={<AddRecipeForm onSubmit={(newRecipe) => setRecipes([...recipes, newRecipe])} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
