// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  darkMode: "class",
  plugins: [require('tailwindcss-animated'),
    nextui({
    prefix: "nextui", 
    addCommonColors: true, 
    layout: {}, 
    themes: {
      light: {
        layout: {}, 
        colors: {
          background: "#F6F6F6", 
          foreground: "#11181C",
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        }, 
      },
      dark: {
        layout: {}, 
        colors: {
          background: "#131313", 
          foreground: "#ECEDEE",
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        }, 
      },
    },
  }),
],
};