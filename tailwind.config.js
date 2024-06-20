module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orangeCustom: "#F19031",
        orangeDarckCustom: "#C97019",
        greyCustom: "#808080",
        blueCustom: "#3B84BA",
        blueDarkCustom: "#396D93",
        veryDarckBlue: "#0a1d5f",
        greyCustom: "#E9E9E9",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '14px': '0.875rem',
        '24px': '1.5rem',
        '12px': '0.75rem',
        '16px': '1rem',
        '18px': '1.125rem',
        '22px': '1.3375rem',
        '48px': '3rem',
      }
    },
  },
  plugins: [],
};