import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';

const Home = () => (
  <div>
    <h1>🍲 Recipe Sharing App</h1>
    <AddRecipeForm />
    <RecipeList />
  </div>
);

const NotFound = () => <div><h2>404 — Not found</h2></div>;

export default function App() {
  return (
    <Router>
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </Router>
  );
}