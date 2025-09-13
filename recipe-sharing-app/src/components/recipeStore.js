import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      favorites: [],
      recommendations: [],
      searchTerm: '',
      ingredientsFilter: [], 
      maxPrepTime: null, 
      filteredRecipes: [],

      addRecipe: (newRecipe) =>
        set((state) => ({ recipes: [...state.recipes, newRecipe] })),
        setRecipes: (recipes) => set({ recipes }),

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

      // filter setters (each triggers recompute)
      setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().filterRecipes();
      },
      setIngredientsFilter: (ingredients) => {
        // ingredients: array of strings
        set({ ingredientsFilter: ingredients });
        get().filterRecipes();
      },
      setMaxPrepTime: (minutes) => {
        set({ maxPrepTime: minutes });
        get().filterRecipes();
      },
      clearFilters: () => {
        set({ searchTerm: '', ingredientsFilter: [], maxPrepTime: null, filteredRecipes: [] });
      },

      // filter logic — matches title OR description, AND ingredient filters, AND prepTime
      filterRecipes: () => {
        const { recipes, searchTerm, ingredientsFilter, maxPrepTime } = get();
        const term = (searchTerm || '').toLowerCase().trim();

        const result = recipes.filter((recipe) => {
          // Title / description match (if term present)
          const title = (recipe.title || '').toLowerCase();
          const desc = (recipe.description || '').toLowerCase();
          const textMatch = !term || title.includes(term) || desc.includes(term);

          // Ingredients match: each filter must be present (partial match allowed)
          let ingredientsMatch = true;
          if (ingredientsFilter && ingredientsFilter.length > 0) {
            const recipeIngredients = (recipe.ingredients || []).map((i) => i.toLowerCase().trim());
            ingredientsMatch = ingredientsFilter.every((f) =>
              recipeIngredients.some((ri) => ri.includes(String(f).toLowerCase().trim()))
            );
          }

          // Prep time match
          let prepMatch = true;
          if (maxPrepTime != null && maxPrepTime !== '') {
            const prep = Number(recipe.prepTime || 0);
            prepMatch = !Number.isNaN(prep) ? prep <= Number(maxPrepTime) : false;
          }

          return textMatch && ingredientsMatch && prepMatch;
        });

        set({ filteredRecipes: result });
      },
    }),

      
    {
      name: 'recipe-storage',
    }
  )
);

export default useRecipeStore;
