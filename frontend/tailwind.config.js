/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryYellow: "#fcba03",
        primaryYellowLight: "#d6992b",
        primaryYellowMedium: "#df8f00",
        primaryYellowDark: "#b96504",

        backgroundLight: "rgba(248, 244, 244)",
        backgroundDark: "rgba(18, 18, 18)"
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

