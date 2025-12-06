/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",           // root HTML file
    "./public/index.html",    // public HTML file
    "./src/**/*.{js,jsx,ts,tsx}" // all React source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};