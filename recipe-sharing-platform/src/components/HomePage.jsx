import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulate loading data from a JSON file
    setRecipes(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Recipe Sharing Platform</h1>
          <p className="text-lg text-gray-600 mt-2">Discover delicious recipes from around the world</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                {/* Recipe Image */}
                <div className="overflow-hidden bg-gray-200 h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Recipe Info */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{recipe.summary}</p>
                  <div className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">
                    View Recipe →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
