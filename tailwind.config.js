module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
          sans: ['Livvic', 'sans-serif'],
      },
      colors: {
        primary: { 
          DEFAULT: "#D23A27",
          dark: "#962a1d",
          light: "#fcc9c2",
          lightest: "#f5d0cb"
        },
        secondary: "#FFCD5A",
        background: {
         DEFAULT: "#F5E6CE",
         light: "#FFF0D7"
        },
        error: "#e31b07"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
