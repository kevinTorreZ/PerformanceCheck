// tailwind.config.js
const {nextui} = require("@nextui-org/react");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'xs': '475px',
      ...defaultTheme.screens,
    },
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
          background: "#FFFFFF", 
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
          background: "#000000", 
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