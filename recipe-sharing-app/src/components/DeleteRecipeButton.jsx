import React from 'react';
import  useRecipeStore  from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId, onDeleted }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm('Delete this recipe?')) return;
    deleteRecipe(recipeId);
    if (typeof onDeleted === 'function') onDeleted();
    else navigate('/'); // default: go home after deletion
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteRecipeButton;
