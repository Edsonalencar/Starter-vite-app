/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "10px",
      },
      boxShadow: {
        custom: "0px 2px 12px rgba(0, 0, 0, 0.1);",
        "custom-top": "2px 0px 15px rgba(0, 0, 0, 0.1);",
        "custom-lg": "0px 4px 20px rgba(0, 0, 0, 0.15);",
      },
    },
    colors: {
      primary: "#FFB300",
      secondary: "#975815",
      "gradient-header":
        "linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(../images/header.jpg)",
    },
  },
  plugins: [],
};
