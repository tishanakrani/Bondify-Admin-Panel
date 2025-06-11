/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        font: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        shadow: '#3c40434d 0px 1px 2px 0px, #3c404326 0px 2px 6px 2px',
      },
    },
  },
  plugins: [],
}
