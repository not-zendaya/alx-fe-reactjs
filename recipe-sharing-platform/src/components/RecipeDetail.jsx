import React from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

function RecipeDetail(){
    const {id }= useParams();

    const recipe = recipesData.find((r) => String(r.id) === id);

    if(!recipe){
        return(
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-gray-600"> Recipe not found.</p>
                <Link to="/" className="mt-4 text-emerald-600 underline"> Back to Home </Link>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-yellow-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                 <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
                 <img
                   src={recipe.image}
                   alt={recipe.title}
                   className="w-full h-64 object-cover rounded-xl mb-6"
                />
                
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {recipe.ingredients.map((item, i) => (
                    <li key={i} className="text-gray-900">{item}</li>
                     ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        {recipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div className="mt-6">
                    <Link to="/" className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700">Back to Home </Link>
                </div>
            </div>
       </div>
    )
}
export default RecipeDetail;