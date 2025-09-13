import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set, get) => ({
      // core data
      recipes: [],

      // filtering state
      searchTerm: '',
      ingredientsFilter: [], // array of strings user wants to filter by
      maxPrepTime: null,     // number (minutes) or null

      // computed results
      filteredRecipes: [],

      // CRUD
      addRecipe: (newRecipe) => {
        set((state) => ({ recipes: [...state.recipes, newRecipe] }));
        get().filterRecipes();
      },
      updateRecipe: (updatedRecipe) => {
        set((state) => ({
          recipes: state.recipes.map((r) =>
            String(r.id) === String(updatedRecipe.id) ? { ...r, ...updatedRecipe } : r
          ),
        }));
        get().filterRecipes();
      },
      deleteRecipe: (id) => {
        set((state) => ({ recipes: state.recipes.filter((r) => String(r.id) !== String(id)) }));
        get().filterRecipes();
      },
      setRecipes: (recipes) => {
        set({ recipes });
        get().filterRecipes();
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
    { name: 'recipe-storage' }
  )
);

export default useRecipeStore;
