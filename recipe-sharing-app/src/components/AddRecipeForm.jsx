import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientsInput, setIngredientsInput] = useState(''); 
  const [prepTime, setPrepTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const ingredients = (ingredientsInput || '')
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      ingredients,
      prepTime: prepTime === '' ? null : Number(prepTime),
    };
    addRecipe(newRecipe);
    setTitle(''); setDescription(''); setIngredientsInput(''); setPrepTime('');
    navigate(`/recipes/${newRecipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <br />
      <input type="text" placeholder="Ingredients (comma separated)" value={ingredientsInput} onChange={(e) => setIngredientsInput(e.target.value)} />
      <br />
      <input type="number" min="0" placeholder="Prep time (min)" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
      <br />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
