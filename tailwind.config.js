module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-background)",
        secondary: "var(--secondary-background)",
        contrast: "var(--text-color)",
        "contrast-hover": "var(--text-color-hover)",
      },
    },
  },
  plugins: [],
};
