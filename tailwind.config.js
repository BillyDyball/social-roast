/** @type {import('tailwindcss').Config} */
import { fontFamily, spacing } from "tailwindcss/defaultTheme.js";

const sans = fontFamily.sans.filter(
  (f) => !["system-ui", "BlinkMacSystemFont"].includes(f)
);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["serif"],
        heading: ["system-ui", "Helvetica Neue", "Helvetica", "Arial"],
        sans: [
          "system-ui",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
        ],
        monospace: [`SF Mono`, `ui-monospace`, `Monaco`, "Monospace"],
      },
      colors: {
        "dark-blue": "#161e27",
      },
    },
  },
  plugins: [],
};
