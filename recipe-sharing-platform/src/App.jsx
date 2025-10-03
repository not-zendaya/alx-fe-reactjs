import { useState } from 'react'
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
 
function App()
 {
  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };
   return (  
  <>
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} /> 
      <Route path="/add" element={<AddRecipeForm onAddRecipe={handleAddRecipe} />} />  
    </Routes>
  </Router>    
  </>
  );
}

export default App;
