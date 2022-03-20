module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-dark": "#272727",
        "primary-light": "#dddddd",
        "primary-green": "#64c64e",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
