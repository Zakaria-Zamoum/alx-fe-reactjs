# Future Enhancements & API Integration Guide

## 🚀 Planned Features

### Phase 2: Backend Integration

#### 1. User Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- User profiles

#### 2. Database Integration
- Replace JSON with database (MongoDB, PostgreSQL)
- Store recipes in database
- Persist user submissions
- Recipe search in database

#### 3. Advanced Features
- User favorites/bookmarks
- Recipe ratings and reviews
- Comments system
- Difficulty levels and cooking time
- Cuisine categories/tags
- Serving size calculations

#### 4. Social Features
- Share recipes on social media
- Recipe collections/folders
- Follow other users
- User activity feed
- Social authentication (Google, GitHub)

---

## 🔌 API Integration Guide

### Step 1: Replace Static Data with API Calls

**Current Implementation (Static):**
```jsx
// HomePage.jsx
useEffect(() => {
  setRecipes(data); // From local JSON
}, []);
```

**Future Implementation (API):**
```jsx
// HomePage.jsx
useEffect(() => {
  fetchRecipes();
}, []);

const fetchRecipes = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/recipes');
    const data = await response.json();
    setRecipes(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Step 2: Create API Service Layer

**Create `src/services/api.js`:**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Recipe API calls
export const recipeAPI = {
  // Get all recipes
  getAll: async (searchTerm = '', filters = {}) => {
    const params = new URLSearchParams({
      ...filters,
      ...(searchTerm && { search: searchTerm })
    });
    const response = await fetch(`${API_BASE_URL}/recipes?${params}`);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return response.json();
  },

  // Get single recipe
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!response.ok) throw new Error('Recipe not found');
    return response.json();
  },

  // Create recipe
  create: async (recipeData) => {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });
    if (!response.ok) throw new Error('Failed to create recipe');
    return response.json();
  },

  // Update recipe
  update: async (id, recipeData) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });
    if (!response.ok) throw new Error('Failed to update recipe');
    return response.json();
  },

  // Delete recipe
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete recipe');
    return response.json();
  }
};

// User API calls
export const userAPI = {
  // Register user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  // Get user profile
  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  }
};
```

### Step 3: Use API Service in Components

**Updated HomePage.jsx:**
```jsx
import { recipeAPI } from '../services/api';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeAPI.getAll(searchTerm);
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {/* Recipe grid */}
    </div>
  );
}
```

**Updated AddRecipeForm.jsx:**
```jsx
import { recipeAPI } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  try {
    // Prepare form data
    const recipeData = {
      title: formData.title,
      summary: formData.summary,
      image: formData.image,
      ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
      instructions: formData.instructions.split('\n').filter(i => i.trim())
    };

    // Submit to API
    await recipeAPI.create(recipeData);
    
    setSubmitted(true);
    setTimeout(() => {
      setFormData({...});
      navigate('/');
    }, 2000);
  } catch (error) {
    setErrors({ submit: error.message });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🔐 Authentication Integration

### Step 1: Create Auth Context

**Create `src/context/AuthContext.jsx`:**
```jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from token in localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      validateToken(token);
    }
    setLoading(false);
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('/api/auth/validate', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('authToken');
    }
  };

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const { token, user } = await response.json();
    localStorage.setItem('authToken', token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Step 2: Update App.jsx with Auth

```jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### Step 3: Use Auth in Components

```jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
}
```

---

## 💾 State Management Enhancement

### Option 1: Redux (Complex Apps)

```bash
npm install redux react-redux @reduxjs/toolkit
```

**Create `src/store/recipesSlice.js`:**
```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchTerm) => {
    const response = await fetch(`/api/recipes?search=${searchTerm}`);
    return response.json();
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default recipesSlice.reducer;
```

### Option 2: Zustand (Lightweight)

```bash
npm install zustand
```

```javascript
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  loading: false,
  
  fetchRecipes: async (searchTerm) => {
    set({ loading: true });
    try {
      const response = await fetch(`/api/recipes?search=${searchTerm}`);
      const data = await response.json();
      set({ recipes: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));
```

---

## 🧪 Testing Setup

### Install Testing Dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Example Test

**`src/components/__tests__/HomePage.test.jsx`:**
```jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders recipe list', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Discover Delicious Recipes/i)).toBeInTheDocument();
  });

  it('filters recipes on search', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const searchInput = screen.getByPlaceholderText(/Search recipes/i);
    // Test search functionality
  });
});
```

---

## 📦 Environment Variables

**Create `.env` file:**
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Recipe Sharing Platform
VITE_APP_VERSION=1.0.0
```

**Use in code:**
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 🚢 Deployment Checklist

### Before Deployment

- [ ] Build project: `npm run build`
- [ ] Test all features
- [ ] Remove console.logs
- [ ] Check for unused imports
- [ ] Update environment variables
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Check lighthouse scores
- [ ] Optimize images
- [ ] Configure CORS on backend

### Deployment Platforms

**Vercel:**
```bash
npm install -g vercel
vercel deploy
```

**Netlify:**
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

**GitHub Pages:**
```javascript
// vite.config.js
export default {
  base: '/recipe-sharing-platform/'
}
```

---

## 📊 Monitoring & Analytics

### Add Google Analytics

```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking with Sentry

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
});
```

---

## 🔄 CI/CD Pipeline

**`.github/workflows/deploy.yml`:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      run: npm run deploy
```

---

## 📚 Documentation Updates

When implementing new features:
- [ ] Update IMPLEMENTATION_SUMMARY.md
- [ ] Update PROJECT_DOCUMENTATION.md
- [ ] Add examples to DEVELOPER_GUIDE.md
- [ ] Update QUICK_START.md if user-facing changes
- [ ] Add visual diagrams to VISUAL_GUIDE.md

---

## 🎯 Performance Optimization

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./components/HomePage'));
const RecipeDetail = lazy(() => import('./components/RecipeDetail'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization

```jsx
// Use responsive images
<img
  src={recipe.image}
  alt={recipe.title}
  loading="lazy"
  srcSet={`
    ${recipe.image}?w=300 300w,
    ${recipe.image}?w=600 600w,
    ${recipe.image}?w=1200 1200w
  `}
/>
```

---

This guide provides a roadmap for scaling the Recipe Sharing Platform to a production-ready application!
