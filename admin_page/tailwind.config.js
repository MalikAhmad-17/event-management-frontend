/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        accent: '#10b981',
        'background-light': '#E2E8F0',
        'background-white': '#FFFFFF',
        'text-dark': '#1F2937',
        'text-medium': '#64748B',
        'text-light': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      }
    },
  },
  plugins: [],
}