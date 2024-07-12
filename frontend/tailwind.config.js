/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {fontFamily: {
      'sans':['Rubik', 'sans-serif'],
    }},
  },
  plugins: [
    '@tailwindcss/typography',
  ],
  fontFace: {
    custom: {
      fontFamily: "MyCustomFont", // Name your custom font
      fontStyle: "normal",
      fontWeight: "400",
      fontDisplay: "swap",
      src: "url('/fonts/your-font.woff2') format('woff2')", // Path to your font file
    },
  },
};
