import useRecipeStore from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const navigate = useNavigate();

  if (!recipe) return <div>Recipe not found!</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />

      {/* Additional UI elements or comments */}
    </div>
  );
};

export default RecipeDetails;
