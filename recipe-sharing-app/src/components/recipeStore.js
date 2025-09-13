import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      favorites: [],
      recommendations: [],

      addRecipe: (newRecipe) =>
        set((state) => ({ recipes: [...state.recipes, newRecipe] })),

      updateRecipe: (updatedRecipe) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            String(r.id) === String(updatedRecipe.id)
              ? { ...r, ...updatedRecipe }
              : r
          ),
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => String(r.id) !== String(id)),
        })),

      // 🔹 Favorites
      addFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.includes(recipeId)
            ? state.favorites
            : [...state.favorites, recipeId],
        })),

      removeFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== recipeId),
        })),

      // 🔹 Recommendations (mock: random favorites-based)
      generateRecommendations: () => {
        const { recipes, favorites } = get();
        const recommended = recipes.filter(
          (recipe) => favorites.includes(recipe.id) && Math.random() > 0.5
        );
        set({ recommendations: recommended });
      },
    }),
    {
      name: 'recipe-storage', // persist favorites too
    }
  )
);

export default useRecipeStore;
