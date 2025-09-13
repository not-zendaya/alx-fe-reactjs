import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const ingredientsFilter = useRecipeStore((s) => s.ingredientsFilter);
  const maxPrepTime = useRecipeStore((s) => s.maxPrepTime);

  const favorites = useRecipeStore((s) => s.favorites);
  const addFavorite = useRecipeStore((s) => s.addFavorite);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  const hasActiveFilters =
    (searchTerm && searchTerm.trim() !== '') ||
    (ingredientsFilter && ingredientsFilter.length > 0) ||
    (maxPrepTime != null && maxPrepTime !== '');

  const list = hasActiveFilters ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipes</h2>
      {list.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        list.map((recipe) => {
          const isFavorite = favorites.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              style={{
                border: '1px solid #eee',
                padding: '8px',
                marginBottom: '8px',
              }}
            >
              <h3>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </h3>
              <p>{recipe.description}</p>
              {recipe.ingredients?.length > 0 && (
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
                </p>
              )}
              {recipe.prepTime != null && (
                <p>
                  <strong>Prep:</strong> {recipe.prepTime} min
                </p>
              )}

              {/* 🔹 Favorite button */}
              <button
                onClick={() =>
                  isFavorite
                    ? removeFavorite(recipe.id)
                    : addFavorite(recipe.id)
                }
              >
                {isFavorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecipeList;
