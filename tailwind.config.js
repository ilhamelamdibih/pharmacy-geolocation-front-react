/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        'logo':['DM Serif Display', 'serif'],
        'roboto':['Roboto','sans-serif']
      },
      colors:{
        'main':'#008F8C'
      },
      zIndex: {
        '100': '100',
        '90':'90'
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}