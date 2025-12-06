# Recipe Sharing Platform

A modern, responsive React application for sharing and discovering delicious recipes. Built with React, React Router, and Tailwind CSS.

## Features

### ✨ Core Features
- **Home Page**: Browse all recipes in a responsive grid layout
- **Recipe Search**: Search recipes by name or description in real-time
- **Recipe Details**: View complete recipe information including ingredients and step-by-step instructions
- **Add Recipe**: Submit new recipes with validation
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Navigation Bar**: Consistent navigation across all pages

### 📱 Pages

#### 1. Home Page (`/`)
- Display all recipes in a responsive grid (1 col on mobile, 2 on tablet, 3 on desktop)
- Search functionality to filter recipes
- Recipe count indicator
- Quick access to add new recipes
- Hover effects for better interactivity

#### 2. Recipe Detail Page (`/recipe/:id`)
- Full recipe information display
- Beautiful image showcase
- Organized ingredients list with checkmarks
- Numbered cooking instructions
- Call-to-action to explore more recipes
- Back navigation to home

#### 3. Add Recipe Form (`/add-recipe`)
- Comprehensive form for submitting new recipes
- Fields: Title, Summary, Image URL, Ingredients, Instructions
- Real-time form validation
- Error messages with visual feedback
- Success confirmation with auto-redirect
- Responsive form layout

### 🎨 Design Features
- Modern, clean UI with professional color scheme
- Smooth animations and transitions
- Hover effects on interactive elements
- Consistent typography and spacing
- Color-coded feedback (errors, success, info)
- Mobile-first responsive design

### ✅ Validation Features
- Recipe title validation (3+ characters)
- Summary validation (10+ characters)
- Image URL format validation
- Ingredients requirement (minimum 2)
- Instructions requirement (minimum 2)
- Real-time error clearing
- Field-specific error messages
- Counter for ingredients and steps

## Project Structure

```
src/
├── components/
│   ├── HomePage.jsx          # Main recipe listing page with search
│   ├── RecipeDetail.jsx       # Individual recipe detail view
│   ├── AddRecipeForm.jsx      # Form for submitting new recipes
│   └── Navigation.jsx         # Navigation bar component
├── data.json                  # Mock recipe data (5 sample recipes)
├── App.jsx                    # Main app with routing
├── main.jsx                   # React entry point
└── index.css                  # Global styles with Tailwind
```

## Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Browse all recipes |
| `/recipe/:id` | RecipeDetail | View specific recipe details |
| `/add-recipe` | AddRecipeForm | Add a new recipe |

## Technologies Used

- **React 19.2.0**: UI library
- **React Router DOM 6.x**: Client-side routing
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-sharing-platform.git
cd recipe-sharing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm lint
```

## Sample Data

The application comes with 5 sample recipes:
1. Spaghetti Carbonara
2. Chicken Tikka Masala
3. Vegetable Stir Fry
4. Margherita Pizza
5. Thai Green Curry

Each recipe includes:
- Title
- Summary
- Image URL
- List of ingredients
- Step-by-step instructions

## Form Validation Rules

### Recipe Title
- Required field
- Minimum 3 characters

### Recipe Summary
- Required field
- Minimum 10 characters

### Image URL
- Required field
- Must start with `http://` or `https://`

### Ingredients
- Required field
- Minimum 2 ingredients (one per line)

### Cooking Instructions
- Required field
- Minimum 2 steps (one per line)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and profiles
- Save favorite recipes
- Recipe ratings and reviews
- Share recipes on social media
- Recipe categories/tags
- Difficulty levels and cooking time
- Ingredient quantity adjustments
- Recipe scaling for servings
- Database integration for persistent storage

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React and Tailwind CSS**
