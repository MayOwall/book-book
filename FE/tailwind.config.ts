import type { Config } from "tailwindcss";

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
      },
    },
  },
  safelist: [
    { pattern: /bg-page-(none|little|ordinary|many)/ },
    "border-red-500",
  ],
  plugins: [],
};
export default config;
