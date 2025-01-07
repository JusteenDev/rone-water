/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [ require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "business","aqua"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light",
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}