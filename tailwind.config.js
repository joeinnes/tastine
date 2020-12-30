const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: [ './**/*.html', './src/**/*.js' ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grey: colors.warmGray,
        brand: '#FE654F',
        dc1: '#FED99B',
        dc2: '#FED18C',
        cb: '#D6EFFF',
        white: '#FEFEFF'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
