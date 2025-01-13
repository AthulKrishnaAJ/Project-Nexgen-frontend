/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor:'#24A484',
        bgThemeColor: '#F0FBFA'
      },
      fontFamily:{
        rubik:['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}

