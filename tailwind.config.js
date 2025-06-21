/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: { 
      colors: { 
        primary: "#0080ff",
        'blue-500': '#3b82f6',
        'blue-400': '#60a5fa',
      },
      fontFamily: {
        'arabic': ['Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'serif'],
        'cairo': ['Cairo', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
        'almarai': ['Almarai', 'sans-serif'],
        'noto': ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 