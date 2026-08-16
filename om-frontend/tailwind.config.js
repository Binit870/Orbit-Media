/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Switzer'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["'Switzer'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
}
