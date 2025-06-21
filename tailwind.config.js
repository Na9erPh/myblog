/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: { 
      colors: { primary: "#0080ff" },
      fontFamily: {
        'arabic': ['Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 