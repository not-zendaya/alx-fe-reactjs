import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === String(id)));

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/recipes/${recipe.id}/edit`}><button>Edit</button></Link>
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>

      <hr />
      <Link to="/">← Back to recipes</Link>
    </div>
  );
};

export default RecipeDetails;
