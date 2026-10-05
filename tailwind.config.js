/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cream: '#F5F0E8',
        charcoal: '#1A1A1A',
        ink: '#111111',
        rust: '#C8522A',
        sage: '#7A8C7E',
        warm: '#E8E0D0',
      }
    },
  },
  plugins: [],
}
