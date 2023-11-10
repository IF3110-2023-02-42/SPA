/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#000000",
        purpleBg: "#4D2C5E",
        creamBg: "#FDF8EE",
      },
    },
  },
  plugins: [],
};
