// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "main-gray": "#e0e0e0",
        "main-orange": "#ff6f00",
        primary: {
          DEFAULT: "#ff6f00"
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
