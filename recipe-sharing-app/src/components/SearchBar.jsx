import React, { useState, useRef, useEffect } from 'react';
import useRecipeStore from './recipeStore'; 

const SearchBar = () => {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const ingredientsFilter = useRecipeStore((s) => s.ingredientsFilter);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);
  const setIngredientsFilter = useRecipeStore((s) => s.setIngredientsFilter);
  const setMaxPrepTime = useRecipeStore((s) => s.setMaxPrepTime);
  const clearFilters = useRecipeStore((s) => s.clearFilters);

  const [ingredientInput, setIngredientInput] = useState('');
  const [localMaxPrep, setLocalMaxPrep] = useState(ingredientsFilter.maxPrepTime || '');
  const debounceRef = useRef(null);

  // debounce search input to avoid too many recomputes
  const handleSearchChange = (event) => {
    const value = event.target.value;
    // 300ms debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchTerm(value), 300);
  };

  useEffect(() => () => debounceRef.current && clearTimeout(debounceRef.current), []);

  const addIngredient = () => {
    const val = (ingredientInput || '').trim();
    if (!val) return;
    const next = Array.from(new Set([...(ingredientsFilter || []), val]));
    setIngredientsFilter(next);
    setIngredientInput('');
  };

  const removeIngredient = (ing) => {
    setIngredientsFilter((ingredientsFilter || []).filter((i) => i !== ing));
  };

  const handleMaxPrepChange = (event) => {
    const v = event.target.value;
    setLocalMaxPrep(v);
    const minutes = v === '' ? null : Number(v);
    setMaxPrepTime(minutes);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        defaultValue={searchTerm}
        placeholder="Search recipes by name or description..."
        onChange={handleSearchChange}
        style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
        aria-label="Search recipes"
      />

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <input
          type="text"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          placeholder="Ingredient (e.g. 'tomato')"
        />
        <button type="button" onClick={addIngredient}>Add</button>

        <input
          type="number"
          min="0"
          placeholder="Max prep time (mins)"
          value={localMaxPrep}
          onChange={handleMaxPrepChange}
        />

        <button onClick={() => { clearFilters(); setLocalMaxPrep(''); }}>Clear</button>
      </div>

      <div>
        {(ingredientsFilter || []).map((ing) => (
          <button
            key={ing}
            onClick={() => removeIngredient(ing)}
            style={{ marginRight: '6px', marginBottom: '6px' }}
            type="button"
          >
            {ing} ✕
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
