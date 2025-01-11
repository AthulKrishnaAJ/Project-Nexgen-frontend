/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        rubik:['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}

