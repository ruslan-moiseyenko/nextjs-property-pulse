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
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",

        button_primary: "rgb(var(--color-button_primary) / <alpha-value>)",
        button_hover: "rgb(var(--color-button_hover) / <alpha-value>)",
        button_secondary: "rgb(var(--color-button_secondary) / <alpha-value>)",

        bg_primary: "rgb(var(--color-bg_primary) / <alpha-value>)",
        bg_secondary: "rgb(var(--color-bg_secondary) / <alpha-value>)",
        bg_tertiary: "rgb(var(--color-bg_tertiary) / <alpha-value>)",

        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accent_light: "rgb(var(--color-button_primary) / <alpha-value>)",

        white: "rgb(var(--color-white) / <alpha-value>)",
        black: "rgb(var(--color-black) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
