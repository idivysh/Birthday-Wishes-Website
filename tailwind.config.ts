import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "#F7C9DD", blush: "#FCE4EF", lav: "#DCCBFA", purple: "#B99AE8",
        cloud: "#FFF9FD", rose: "#E98AB6", plum: "#35223E", muted: "#806E85",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "var(--font-telugu)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: { glow: "0 0 60px rgba(233,138,182,.45)" },
    },
  },
  plugins: [],
};
export default config;
