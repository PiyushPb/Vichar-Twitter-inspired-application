/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Set Poppins as the default font
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        ...colors,
        // light theme
        bgLight: "#F4F8FB",
        primaryLight: "#303741",
        white: "#FFFFFF",
        textLight: "#0A1321",
        inputColorLight: "#ebebeb",
        lightHover: "#ebebeb",

        // dark theme
        bgDark: "#101010",
        primaryDark: "#FFFFFF",
        textDark: "#FFFFFF",
        inputColorDark: "#1e1e1e",
        darkBorderColor: "#1e1e1e",
        darkHover: "#1e1e1e",
        baseDark: "#1b1919",
        darkInputBg: "#1b1b1b",

        // common
        matteblack: "#14202e",
        richBlack: "#0A1321",
        primaryBlue: "#3DADF2",
      },
    },
  },
  plugins: [],
});
