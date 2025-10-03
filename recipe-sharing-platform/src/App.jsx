import { useState } from 'react'
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
function App()
 {
   return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />       
    </Routes>   
   <HomePage />
   <RecipeDetail />
   </>
  );
}

export default App;
