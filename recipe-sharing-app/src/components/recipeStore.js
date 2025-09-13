import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],
      addRecipe: (newRecipe) =>
        set((state) => ({ recipes: [...state.recipes, newRecipe] })),
      updateRecipe: (updatedRecipe) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            String(r.id) === String(updatedRecipe.id) ? { ...r, ...updatedRecipe } : r
          ),
        })),
      deleteRecipe: (id) =>
        set((state) => ({ recipes: state.recipes.filter((r) => String(r.id) !== String(id)) })),
      setRecipes: (recipes) => set({ recipes }),
    }),
    {
      name: 'recipe-storage', // localStorage key (persist)
    }
  )
);

export default useRecipeStore;
