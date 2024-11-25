/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pdarkblue: "#0B588F",
        pblue: "#26AAE1",
        porange: "#EB891B",
        pgreen: "#68B92E",
        base: "#EEF0F2",

        ternaryBlue: '#0A3357',
        primaryBlue:'#228be6',
        secondaryBlue: '#D7EAFB',
        primaryOrange: '#e67e22',
        grayCustom: '#eef0f2',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        assistant: ["Assistant", "sans-serif"],
      },
      screens: {
        'xs': '350px',
        '2xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
    },
  },
  // darkMode: "class",
  plugins: [
    nextui(),
    require('daisyui'),
  ],
};
