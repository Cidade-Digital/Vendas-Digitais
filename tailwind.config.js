/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7f1",
          100: "#d6ecdf",
          500: "#2f9e63",
          600: "#248050",
          700: "#1c6640",
        },
        ink: "#0f1b16",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
