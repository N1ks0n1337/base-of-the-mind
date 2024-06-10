module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orangeCustom: "#F19031",
        greyCustom: "#808080",
        blueCustom: "#3B84BA"
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '14px': '0.875rem',
        '24px': '1.5rem',
        '12px': '0.75rem',
      }
    },
  },
  plugins: [],
};