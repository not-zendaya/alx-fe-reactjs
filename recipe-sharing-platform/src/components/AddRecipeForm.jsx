import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function AddRecipeForm({onAddRecipe}){
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [errors, setErrors] = useState({});

    const validate =() =>{
        const newErrors = {};

         if (!title.trim()) newErrors.title = "Title is required.";
         const ingredientsArr = ingredients.split(",").map(i => i.trim()).filter(Boolean);
         if (ingredientsArr.length < 2) newErrors.ingredients = "At least two ingredients are required.";
         if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

         setErrors(newErrors);
         return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (!validate()) return;

        console.log("Form submitted");

        const newRecipe = {
            id: Date.now(),
            title: title.trim(), 
            ingredients: ingredients.split(",").map(i => i.trim()).filter(Boolean),
            instructions: steps.split(".").map(s => s.trim()).filter(Boolean),
        };

        if(onAddRecipe){
            onAddRecipe(newRecipe);
        }

    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-teal-500 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg md:max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Add a New Recipe
        </h2>

        {errors.title && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded-lg text-sm text-center">
            {errors.title}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Ingredients (separate with commas)
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Apples, Bananas, Yogurt"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Preparation Steps
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Describe how to prepare the recipe"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Submit Recipe
        </button>
        <div className="mt-6">
           <Link to="/" className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700">Back to Home </Link>
        </div>
      </form>
    </div>
  );
}
export default AddRecipeForm;


