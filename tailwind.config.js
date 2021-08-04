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
        primary: "#D23A27",
        secondary: "#FFCD5A",
        background: "#F5E6CE",
        error: "#E74C3C"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
