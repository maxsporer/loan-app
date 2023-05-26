/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#000000",
        "primary": "var(--primary)",
        "tertiary": "var(--tertiary)",
        "link": "var(--link)",
        "error": "var(--error)",
        "bg": "var(--bg)",
      },
    },
  },
  plugins: [],
}
