import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-source-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-source-serif)", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        background: "#252525",
        backgroundLight: "#2E2E2E",
        backgroundLighter: "#383838",
        backgroundDark: "#1C1C1C",
        backgroundDarker: "#131313",
        logo: "#197060",
        primary: "#1F8C78",
        primaryLight: "#26A890",
        complementary: "#BD602F",
        text: "#EBDBB2",
        textLight: "#FFFFFF",
        textDark: "#D6B560",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
