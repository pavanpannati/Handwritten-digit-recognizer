/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/brain.png')",
      }
    },
  },
  plugins: [],
};
