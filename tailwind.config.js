/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      sm: "300px",
      md: "576px",
      lg: "800px",
    },
  },
  plugins: [],
};
