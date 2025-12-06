import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function AddRecipeForm() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: '',
    instructions: ''
  });

  // Validation and submission state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Check title
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Recipe title must be at least 3 characters';
    }

    // Check summary
    if (!formData.summary.trim()) {
      newErrors.summary = 'Recipe summary is required';
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters';
    }

    // Check image URL
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.image.trim())) {
      newErrors.image = 'Please enter a valid image URL (starting with http:// or https://)';
    }

    // Check ingredients
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients list is required';
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients (one per line)';
      }
    }

    // Check instructions
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Cooking instructions are required';
    } else {
      const instructionsList = formData.instructions.split('\n').filter(item => item.trim());
      if (instructionsList.length < 2) {
        newErrors.instructions = 'Please add at least 2 cooking steps (one per line)';
      }
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Simulate form submission
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSubmitted(true);
      
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setFormData({
          title: '',
          summary: '',
          image: '',
          ingredients: '',
          instructions: ''
        });
        setSubmitted(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit recipe. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Add New Recipe</h1>
          <p className="text-lg text-gray-600 mt-2">Share your delicious recipe with the community</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold">Recipe submitted successfully!</p>
              <p className="text-sm">Redirecting to home page...</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Recipe Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Spaghetti Carbonara"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.title}
              </p>
            )}
          </div>

          {/* Recipe Summary */}
          <div className="mb-6">
            <label htmlFor="summary" className="block text-sm font-semibold text-gray-900 mb-2">
              Recipe Summary *
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a brief description of your recipe (at least 10 characters)"
              rows="3"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-vertical ${
                errors.summary ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.summary && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.summary}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-900 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://via.placeholder.com/400x300"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.image}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Provide a valid image URL starting with http:// or https://
            </p>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-900 mb-2">
              Ingredients * <span className="text-gray-500 text-xs font-normal">(one per line, minimum 2)</span>
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder={`2 cups flour\n1 egg\n250ml milk\n2 tbsp butter`}
              rows="5"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-vertical font-mono text-sm ${
                errors.ingredients ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.ingredients && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.ingredients}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              {formData.ingredients.split('\n').filter(i => i.trim()).length} ingredient(s) added
            </p>
          </div>

          {/* Cooking Instructions */}
          <div className="mb-8">
            <label htmlFor="instructions" className="block text-sm font-semibold text-gray-900 mb-2">
              Cooking Instructions * <span className="text-gray-500 text-xs font-normal">(one step per line, minimum 2)</span>
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder={`Preheat oven to 350°F\nMix all dry ingredients\nCombine wet ingredients separately\nFold wet into dry ingredients\nBake for 30 minutes`}
              rows="6"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-vertical font-mono text-sm ${
                errors.instructions ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.instructions && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.instructions}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              {formData.instructions.split('\n').filter(i => i.trim()).length} step(s) added
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Submitting...
                </>
              ) : (
                <>
                  <span>✓</span>
                  Submit Recipe
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Required Fields Note */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            * Fields marked with asterisk are required
          </p>
        </form>
      </main>
    </div>
  );
}

export default AddRecipeForm;
