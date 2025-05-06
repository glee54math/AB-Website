/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
      colors: {
        electricBlue: "#00e5ff",
        limeGreen: "#74f58c",
        neonYellow: "#f4ff3a",
        brightOrange: "#ffb800",
        punchOrange: "#ff501f",
      },
      keyframes: {
        shake: {
          '0%,  100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': {transform: 'translateX(5px)'},
        },
      },
    },
  },
  plugins: [],
};
