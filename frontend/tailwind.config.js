/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        // light theme
        bgLight: "#F4F8FB",
        primaryLight: "#303741ff",
        white: "#FFFFFFff",
        textLight: "#0A1321ff",
        inputColorLight: "#ebebeb",

        // dark theme
        bgDark: "#101010",
        primaryDark: "#FFFFFFff",
        textDark: "#FFFFFFff",
        inputColorDark: "#1e1e1eff",

        richBlack: "#0A1321ff",
        primaryBlue: "#3DADF2ff",
      },
    },
  },
  plugins: [],
};
