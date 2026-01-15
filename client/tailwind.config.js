/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // AstraPanel ka Brand Color (Indigo)
        dark: '#1e293b',    // Dark Mode background
      }
    },
  },
  plugins: [],
}
