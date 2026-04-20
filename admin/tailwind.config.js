/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cuba: {
          red: '#FF0000',
          blue: '#002A8F',
          gray: '#f5f5f5',
        }
      }
    },
  },
  plugins: [],
}

