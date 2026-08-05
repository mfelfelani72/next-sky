/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-06 09:17:22
 * @Description:
 */

/** @type {import('tailwindcss').Config} */

import safelist from "./tailwind-safelist";

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [...safelist],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "monospace"],
        satoshi: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        iranSans: ["var(--font-iranSans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
