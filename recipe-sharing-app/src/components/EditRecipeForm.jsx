import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  useRecipeStore from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === String(id)));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id: recipe.id, title: title.trim(), description: description.trim() });
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
