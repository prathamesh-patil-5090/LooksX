/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans all files in the `src` folder.
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          500: "#A67C52",
          600: "#8B5E34",
        },
      },
    },
  },
  plugins: [],
};
