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
        bgThemeColor: '#F0FBFA',
        hoverThemeColor: '#298872'
      },
      fontFamily:{
        rubik:['Rubik', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        marcellus: ['Marcellus', 'sans-serif']
      }
    },
  },
  plugins: [],
}

