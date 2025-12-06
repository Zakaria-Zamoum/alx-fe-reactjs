import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import Navigation from './Navigation';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Simulate loading data from a JSON file
    setRecipes(data);
    setFilteredRecipes(data);
  }, []);

  // Filter recipes based on search term
  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Discover Delicious Recipes</h1>
          <p className="text-lg text-blue-100">Explore a world of culinary inspiration</p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        {filteredRecipes.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredRecipes.length}</span> of <span className="font-semibold text-gray-900">{recipes.length}</span> recipes
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </p>
          </div>
        )}

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
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

        {/* No Results */}
        {filteredRecipes.length === 0 && recipes.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No recipes found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

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
