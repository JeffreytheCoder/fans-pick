module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        main: ['Nunito'],
      },
      color: {
        primary: '#FFEAB6',
        light: '#FFF9E9',
        saturated: '#FFDB83',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
