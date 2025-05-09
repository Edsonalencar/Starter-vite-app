/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5D9C59",
      },
      fontSize: {
        "2xs": "10px",
      },
      boxShadow: {
        custom: "0px 2px 12px rgba(0, 0, 0, 0.1);",
        "custom-top": "2px 0px 15px rgba(0, 0, 0, 0.1);",
        "custom-lg": "0px 4px 20px rgba(0, 0, 0, 0.15);",
      },
    },
  },
  plugins: [],
};
