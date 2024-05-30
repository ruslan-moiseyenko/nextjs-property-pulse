/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: { "70/30": "70% 28%" },
    },
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",

      button_primary: "rgb(var(--color-button-primary) / <alpha-value>)",
      button_secondary: "rgb(var(--color-button-secondary) / <alpha-value>)",

      bg_primary: "rgb(var(--color-bg-primary) / <alpha-value>)",
      bg_secondary: "rgb(var(--color-bg-secondary) / <alpha-value>)",
      tertiary: "rgb(var(--color-bg-tertiary) / <alpha-value>)",

      accent: "rgb(var(--color-accent) / <alpha-value>)",
    },
  },
  plugins: [],
};
