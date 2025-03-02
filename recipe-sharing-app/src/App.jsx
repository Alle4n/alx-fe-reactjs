import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import useRecipeStore from './store/recipeStore';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);
  
  useEffect(() => {
    const fetchedRecipes = [
      { id: 1, title: 'Spaghetti', description: 'A delicious Italian dish.' },
      { id: 2, title: 'Pizza', description: 'Tasty and cheesy.' },
      { id: 3, title: 'Salad', description: 'Healthy and fresh.' },
    ];

    setRecipes(fetchedRecipes);
  }, [setRecipes]);

  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
        <RecipeList />
        
        <FavoritesList />
        <RecommendationsList />

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
