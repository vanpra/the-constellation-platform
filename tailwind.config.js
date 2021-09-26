module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Livvic", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#D23A27",
          dark: "#962a1d",
          light: "#fcc9c2",
          lightest: "#f5d0cb",
        },
        secondary: "#FFCD5A",
        background: {
          DEFAULT: "#F5E6CE",
          light: "#FFF0D7",
          dark: "#cfc0a9",
        },
        error: "#e31b07",
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
