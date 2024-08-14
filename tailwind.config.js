/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'mob': { 'max': '440px' },
        'tab': { 'min': '640px' , 'max':'1200px' },
      },
    },
  },
  plugins: [],
}

