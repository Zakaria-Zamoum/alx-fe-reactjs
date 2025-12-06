# Quick Start Guide - Recipe Sharing Platform

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit `http://localhost:5174` in your web browser

---

## 📖 Application Overview

### What is This?
A modern recipe sharing platform built with React where users can:
- Browse a collection of recipes
- Search for specific recipes
- View detailed recipe information
- Add new recipes to the platform

### Main Pages

#### 🏠 Home Page (`/`)
- View all recipes in a beautiful grid layout
- Search recipes by name or description
- Click any recipe card to see full details
- Quick button to add a new recipe

#### 📖 Recipe Details (`/recipe/:id`)
- See complete recipe information
- View recipe image
- Check ingredients list with checkmarks
- Follow step-by-step cooking instructions
- Navigate back to browse other recipes

#### ➕ Add Recipe (`/add-recipe`)
- Fill in recipe details:
  - Recipe name
  - Brief description
  - Image URL
  - Ingredients (one per line)
  - Cooking steps (one per line)
- Form validates automatically
- Get confirmation when submitted

#### 🔍 Navigation Bar
- Available on all pages
- Quick access to browse or add recipes
- Logo and branding

---

## 🔍 How to Use

### Browsing Recipes
1. Open the home page
2. Scroll through recipe cards
3. Use the search box to find specific recipes
4. Click any recipe card to view details

### Adding a Recipe
1. Click "+ Add Recipe" button (top right)
2. Fill in the form fields:
   - **Title**: Recipe name (3+ characters)
   - **Summary**: Short description (10+ characters)
   - **Image URL**: Full URL with http:// or https://
   - **Ingredients**: List items one per line (minimum 2)
   - **Instructions**: List steps one per line (minimum 2)
3. Click "Submit Recipe" button
4. See confirmation and auto-redirect to home

### Viewing Recipe Details
1. Click on any recipe card from home page
2. View complete recipe information:
   - Large recipe image
   - Full description
   - Complete ingredients list
   - Detailed cooking instructions
3. Click "Back to Recipes" to return to home

### Searching
1. On home page, use the search box
2. Type recipe name or part of description
3. Results update instantly
4. Clear search by clicking "Clear Search" button

---

## 📋 Recipes Included

The platform comes with 5 sample recipes:

1. **Spaghetti Carbonara**
   - Classic Italian pasta dish
   - 6 ingredients, 7 steps

2. **Chicken Tikka Masala**
   - Indian curry dish
   - 10 ingredients, 7 steps

3. **Vegetable Stir Fry**
   - Quick Asian-inspired meal
   - 10 ingredients, 7 steps

4. **Margherita Pizza**
   - Simple Italian pizza
   - 6 ingredients, 7 steps

5. **Thai Green Curry**
   - Aromatic Thai dish
   - 9 ingredients, 9 steps

---

## 🛠️ Available Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm lint
```

---

## ✅ Form Validation

The "Add Recipe" form validates:
- ✓ Recipe title is 3+ characters
- ✓ Summary is 10+ characters
- ✓ Image URL is valid (http/https)
- ✓ At least 2 ingredients provided
- ✓ At least 2 cooking steps provided

If validation fails, you'll see clear error messages above each field.

---

## 🎨 Design Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode Friendly**: Light theme optimized for readability
- **Smooth Animations**: Hover effects and transitions
- **Color Coded**: 
  - Blue for primary actions
  - Red for errors
  - Green for success
  - Gray for neutral elements

---

## 📱 Screen Size Support

| Device | Layout |
|--------|--------|
| Mobile (< 768px) | 1 column grid |
| Tablet (768px - 1024px) | 2 column grid |
| Desktop (> 1024px) | 3 column grid |

---

## 🔗 File Structure

```
src/
├── App.jsx                      # Main app with routing
├── components/
│   ├── HomePage.jsx             # Browse recipes + search
│   ├── RecipeDetail.jsx         # View recipe details
│   ├── AddRecipeForm.jsx        # Add new recipe form
│   └── Navigation.jsx           # Top navigation bar
├── data.json                    # Sample recipe data
└── index.css                    # Tailwind CSS styles
```

---

## 🐛 Troubleshooting

### Port Already in Use
If you see "Port 5173 is in use", the app will automatically try port 5174. Check the terminal for the actual URL.

### Page Not Loading
1. Make sure you ran `npm install`
2. Check that dev server is running (`npm run dev`)
3. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
4. Try a different browser

### Form Not Submitting
1. Check all required fields are filled
2. Look for red error messages
3. Ensure image URL starts with http:// or https://
4. Make sure you have at least 2 ingredients and 2 steps

### Search Not Working
1. The search is case-insensitive
2. It searches both title and description
3. Clear search box to see all recipes again

---

## 💡 Tips & Tricks

- **Search Tip**: Type ingredient names to find recipes that contain them
- **Image URLs**: Use any public image URL. Try https://via.placeholder.com/400x300
- **Mobile**: Swipe to scroll through recipe cards on mobile
- **Keyboard**: Press Enter after typing in the search box
- **Back Button**: You can always use browser's back button to return

---

## 🎓 Learning Resources

This project demonstrates:
- React functional components and hooks
- React Router for navigation
- Form handling and validation
- State management with useState
- Conditional rendering
- Array methods (filter, map)
- Tailwind CSS for styling
- Responsive design principles

---

## 📚 Need More Help?

1. Check `PROJECT_DOCUMENTATION.md` for detailed documentation
2. Review `IMPLEMENTATION_SUMMARY.md` for technical details
3. Look at component source code - it's well-commented
4. Check browser console for any error messages (F12)

---

**Happy Cooking! 🍳** 

Enjoy exploring and sharing recipes on the Recipe Sharing Platform!
