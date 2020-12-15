module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js', './_content/**/*.jsx'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'],
      borderRadius: ['last', 'first'],
      container: [],
    },
  },
  plugins: [],
};
