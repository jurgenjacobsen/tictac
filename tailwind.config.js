/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  safelist: [ // Dynamic chart colors
    "bg-neutral-400",
    "bg-green-500",
    "bg-orange-300",
    "bg-pink-400",
    "bg-blue-400",
    "bg-brand"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#313ed8",
        brand2: "#252f9c"
      },
    },
  },
  plugins: [],
}
