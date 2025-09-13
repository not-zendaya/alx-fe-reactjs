import React from 'react';
import { Link } from 'react-router-dom';
import  useRecipeStore  from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one above!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd' }}>
            <h3><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></h3>
            <p>{recipe.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/recipes/${recipe.id}/edit`}><button>Edit</button></Link>
              <DeleteRecipeButton recipeId={recipe.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
