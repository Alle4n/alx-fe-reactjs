import React, { useState } from 'react';

const AddRecipeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    let newErrors = { title: '', ingredients: '', steps: '' };

    if (!title) {
      newErrors.title = 'Recipe title is required';
      formIsValid = false;
    }
    if (!ingredients) {
      newErrors.ingredients = 'Ingredients are required';
      formIsValid = false;
    } else if (ingredients.split('\n').length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients';
      formIsValid = false;
    }
    if (!steps) {
      newErrors.steps = 'Preparation steps are required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const newRecipe = { title, ingredients, steps };
      onSubmit(newRecipe);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List your ingredients, one per line"
          />
          {errors.ingredients && <p className="text-sm text-red-500 mt-1">{errors.ingredients}</p>}
        </div>

        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Preparation Steps</label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows="6"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the preparation steps"
          />
          {errors.steps && <p className="text-sm text-red-500 mt-1">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
