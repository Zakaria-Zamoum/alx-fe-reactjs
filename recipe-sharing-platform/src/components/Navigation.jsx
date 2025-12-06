import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">Recipe Hub</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 font-semibold transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/add-recipe"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
