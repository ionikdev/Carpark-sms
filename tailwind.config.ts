import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/backGroundImages/bg.png')",
      },
      colors: {
        primary1: "#FFF",
      },
    },
  },
  plugins: [],
};
export default config;
