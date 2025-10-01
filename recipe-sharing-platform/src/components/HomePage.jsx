import React, {useState, useEffect} from "react";
import {Link } from "react-router-dom";
import recipesData from "../data.json";

function HomePage(){
    const[ recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(recipesData);
    }, []);

    return(
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-teal-500 p-6">
        <h1 className="text-3xl text-center font-bold text-white mb-8">Recipe Sharing</h1>
        <p className="text-white text-lg text-center mb-6"> Discover tasty recipes from the community. Given with love to all.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {recipes.map((r => 
                <div
                key={r.id}
                className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transform hover:-translate-y-1 transition"
                >
                <img src={r.image} alt={r.title} 
                 className="w-40 h-40 object-cover rounded-full border-4 border-emerald-700 mt-10 mb-4 shadow-md"
                />
                <h2 className="text-xl font-semibold text-gray-800">{r.title}</h2>
                <p  className="text-gray-600 text-sm text-center mt-2">{r.summary}</p>
                <button className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition">View Recipe</button>
                </div>
            ))}    
        </div>
    </div>
    )
}
export default HomePage;