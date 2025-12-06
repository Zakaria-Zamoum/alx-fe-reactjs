# Developer Guide - Best Practices & Code Examples

## 🏗️ Architecture & Best Practices

### 1. Component Structure

All components follow a consistent pattern:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ComponentName() {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Hook effects
  useEffect(() => {
    // Setup logic
  }, [dependencies]);

  // Handler functions
  const handleEvent = (e) => {
    // Event handling
  };

  // Render
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### 2. State Management Patterns

**For simple component state:**
```jsx
const [recipes, setRecipes] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
```

**For complex form state:**
```jsx
const [formData, setFormData] = useState({
  title: '',
  summary: '',
  image: '',
  ingredients: '',
  instructions: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

### 3. Effect Hook Patterns

**Load data on mount:**
```jsx
useEffect(() => {
  setRecipes(data);
}, []);
```

**Dependent effect:**
```jsx
useEffect(() => {
  const filtered = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredRecipes(filtered);
}, [searchTerm, recipes]);
```

---

## 🎨 Tailwind CSS Patterns

### Responsive Classes

```jsx
// Single column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Content */}
</div>

// Flex layout: column on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-4">
  {/* Content */}
</div>

// Padding: different on mobile vs desktop
<div className="px-4 sm:px-6 lg:px-8 py-8">
  {/* Content */}
</div>
```

### Common Component Patterns

**Button Pattern:**
```jsx
<button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
  Click Me
</button>
```

**Input Pattern:**
```jsx
<input
  type="text"
  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
    errors.field ? 'border-red-500 bg-red-50' : 'border-gray-300'
  }`}
/>
```

**Card Pattern:**
```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
  {/* Card Content */}
</div>
```

---

## ✅ Validation Patterns

### Form Validation Structure

```jsx
const validateForm = () => {
  const newErrors = {};

  // Validate each field
  if (!formData.title.trim()) {
    newErrors.title = 'Title is required';
  } else if (formData.title.trim().length < 3) {
    newErrors.title = 'Title must be at least 3 characters';
  }

  // Return errors object
  return newErrors;
};

// Usage in form submission
const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return; // Don't submit if errors exist
  }

  // Proceed with submission
};
```

### Real-time Error Clearing

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // Clear error for this field
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }
};
```

---

## 🔀 Routing Patterns

### Route Definition

```jsx
// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Accessing URL Parameters

```jsx
// In component
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  
  const recipe = data.find(r => r.id === parseInt(id));
  
  // Use recipe...
}
```

### Navigation in Code

```jsx
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Do something...
    navigate('/'); // Redirect to home
  };

  return <button onClick={handleSubmit}>Go Home</button>;
}
```

---

## 🔍 Search/Filter Pattern

```jsx
// State setup
const [recipes, setRecipes] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [filteredRecipes, setFilteredRecipes] = useState([]);

// Load initial data
useEffect(() => {
  setRecipes(data);
  setFilteredRecipes(data);
}, []);

// Filter on search term change
useEffect(() => {
  const filtered = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredRecipes(filtered);
}, [searchTerm, recipes]);

// In JSX
<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search recipes..."
/>

<div>
  {filteredRecipes.map(recipe => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ))}
</div>

{filteredRecipes.length === 0 && (
  <p>No recipes found matching "{searchTerm}"</p>
)}
```

---

## 🔄 Async Operations Pattern

```jsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Validate
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Success
    showSuccessMessage();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🎯 Conditional Rendering Patterns

### Simple Conditional

```jsx
{recipes.length === 0 && (
  <div className="text-center">
    <p>No recipes found</p>
  </div>
)}
```

### Ternary Operator

```jsx
<button disabled={isSubmitting}>
  {isSubmitting ? '⏳ Submitting...' : '✓ Submit'}
</button>
```

### Complex Conditional

```jsx
{loading && <p>Loading...</p>}
{!loading && !recipe && <p>Recipe not found</p>}
{!loading && recipe && (
  <div>
    <h1>{recipe.title}</h1>
    {/* Recipe details */}
  </div>
)}
```

---

## 📝 Data Structure Examples

### Recipe Object

```javascript
{
  id: 1,
  title: "Spaghetti Carbonara",
  summary: "A classic Italian pasta dish...",
  image: "https://via.placeholder.com/400x300",
  ingredients: [
    "400g spaghetti",
    "200g pancetta",
    "4 large eggs"
  ],
  instructions: [
    "Bring a large pot of salted water to boil...",
    "While the pasta cooks, fry the diced pancetta...",
    "..."
  ]
}
```

### Form Data State

```javascript
{
  title: "",
  summary: "",
  image: "",
  ingredients: "", // Multi-line string
  instructions: ""  // Multi-line string
}
```

### Validation Errors

```javascript
{
  title: "Recipe title is required",
  summary: "Summary must be at least 10 characters",
  image: "Please enter a valid image URL",
  ingredients: "Please add at least 2 ingredients",
  instructions: "Please add at least 2 cooking steps"
}
```

---

## 🎨 Styling Best Practices

### Use Tailwind Utility Classes

✅ **DO:**
```jsx
<div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
```

❌ **DON'T:**
```jsx
<div style={{display: 'flex', justifyContent: 'space-between', ...}}>
```

### Responsive Classes

✅ **DO:**
```jsx
<div className="text-lg md:text-xl lg:text-2xl">
```

✅ **DO:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Hover States

✅ **DO:**
```jsx
<button className="bg-blue-500 hover:bg-blue-600 transition-colors">
```

### Conditional Classes

✅ **DO:**
```jsx
<input className={`border ${errors.field ? 'border-red-500' : 'border-gray-300'}`} />
```

---

## 🚀 Performance Tips

### 1. Use useCallback for event handlers (when needed)

```jsx
const handleSubmit = useCallback((e) => {
  e.preventDefault();
  // Handle submit
}, [dependencies]);
```

### 2. Memoize expensive computations

```jsx
useMemo(() => {
  return recipes.filter(/* complex filter */);
}, [recipes, searchTerm]);
```

### 3. Use React.memo for expensive components

```jsx
const RecipeCard = React.memo(function RecipeCard({ recipe }) {
  return (/* card JSX */);
});
```

---

## 🐛 Debugging Tips

### Console Logging

```jsx
useEffect(() => {
  console.log('Recipes loaded:', recipes);
}, [recipes]);
```

### React DevTools

1. Install React DevTools browser extension
2. Inspect components to see state and props
3. Track component renders and updates

### Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Monitor API calls (when implemented)

### Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

---

## 📚 Common Patterns Summary

| Task | Pattern |
|------|---------|
| Load data on mount | `useEffect(() => {...}, [])` |
| Watch value changes | `useEffect(() => {...}, [value])` |
| Navigate programmatically | `navigate('/path')` |
| Get URL parameters | `useParams()` |
| Form validation | `validateForm()` returns error object |
| Search/filter | `filter()` array method |
| Conditional rendering | `&&` or ternary operator |
| Handle input changes | `handleChange()` with spread operator |
| Show loading state | `isLoading && <LoadingComponent />` |
| Show error state | `error && <ErrorComponent message={error} />` |

---

## ✅ Checklist for New Features

- [ ] Create new component file in `src/components/`
- [ ] Import necessary hooks and dependencies
- [ ] Define component with clear structure
- [ ] Add prop validation/types if needed
- [ ] Style with Tailwind CSS classes
- [ ] Handle error states
- [ ] Add loading states if needed
- [ ] Test responsiveness
- [ ] Update routing in App.jsx if needed
- [ ] Update Navigation if needed
- [ ] Test in browser

---

## 📞 Quick Reference

### Useful Hooks

```jsx
// State
const [state, setState] = useState(initialValue);

// Effects
useEffect(() => {...}, [dependencies]);

// Routing
const { id } = useParams();
const navigate = useNavigate();
const { pathname } = useLocation();

// Refs
const inputRef = useRef(null);

// Context
const value = useContext(MyContext);
```

### Useful Array Methods

```jsx
// Filter
const filtered = array.filter(item => item.id === 5);

// Map
const mapped = array.map(item => item.title);

// Find
const found = array.find(item => item.id === 5);

// Some
const exists = array.some(item => item.id === 5);

// Every
const allValid = array.every(item => item.title);
```

---

This guide provides the patterns and practices used throughout the Recipe Sharing Platform!
