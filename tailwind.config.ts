import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-darkpurple': '#412161',
        'custom-lightpurple': '#af8ef5',
        'custom-light': '#53fabe',
        'custom-medium': '#d6cadd ',
        'custom-darkmint': '#52b788',
        'custom-button': '#453f3c',
        'custom-content': '#a7a7a9',
        'neonGreen': '#39FF14',
        'neonPink': '#FF6EC7',
        'neonBlue': '#1F51FF',
        'neonOrange': '#FF5F00',
        'neonYellow': '#FFFF33',
        'neonPurple': '#BF00FF',
        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
