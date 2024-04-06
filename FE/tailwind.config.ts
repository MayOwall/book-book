import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        book: "1 / 1.414",
      },
      textColor: {
        green: "#4BD189",
      },
      backgroundColor: {
        "page-none": "#4BD18900",
        "page-little": "#4BD18930",
        "page-ordinary": "#4BD18960",
        "page-many": "#4BD189",
        main: "#4BD189",
      },
      colors: {
        black: "#2F2F2F",
        primary: {
          default: colors.amber[300],
          hover: colors.amber[200],
          active: colors.amber[500],
        },
        success: {
          default: colors.green[400],
          hover: colors.green[300],
          active: colors.green[600],
        },
        warning: {
          default: colors.yellow[300],
          hover: colors.yellow[200],
          active: colors.yellow[500],
        },
        danger: {
          default: colors.red[500],
          hover: colors.red[400],
          active: colors.red[700],
        },
        info: {
          default: colors.blue[500],
          hover: colors.blue[400],
          active: colors.blue[700],
        },
        disabled: {
          default: colors.gray[300],
          hover: colors.gray[300],
          active: colors.gray[300],
        },
      },
    },
  },
  safelist: [
    { pattern: /bg-page-(none|little|ordinary|many)/ },
    "border-red-500",
    { pattern: /status-./ },
    { pattern: /button-./ },
  ],
  plugins: [],
};
export default config;
