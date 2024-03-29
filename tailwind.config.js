const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Fonts are being loaded on `src/pages/_document.tsx`, so if you want to
      // change the font, you need to change the url there and name here.
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "telegram-white": "var(--telegram-bg-color)",
        "telegram-black": "var(--telegram-text-color)",
        "telegram-hint": "var(--telegram-hint-color)",
        "telegram-link": "var(--telegram-link-color)",
        "telegram-primary": "var(--telegram-button-color)",
        "telegram-primary-text": "var(--telegram-button-text-color)",
        "telegram-secondary-white": "var(--telegram-secondary-bg-color)",
      },
      screens: {
        // 560px is the size of desktop Telegram's window width.
        tg: "35rem",
      },
    },
  },
  plugins: [],
};
