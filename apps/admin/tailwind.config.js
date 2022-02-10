module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%;" },
        },
      },
      animation: {
        gradient: "gradient 1s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
