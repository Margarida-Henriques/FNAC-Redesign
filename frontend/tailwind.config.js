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
        backgroundLight: "rgba(245, 245, 245)",
        backgroundDark: "#121212"
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

