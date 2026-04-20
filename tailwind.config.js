/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './style.css', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        cuba: {
          red: '#FF0000',
          blue: '#002A8F',
          white: '#FFFFFF',
          dark: '#1a1a1a',
          gray: '#f5f5f5',
          text: '#333333',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        condensed: ['Roboto Condensed', 'Arial Narrow', 'sans-serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false, // Preserve custom resets
  },
}

