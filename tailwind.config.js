/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      aspectRatio: {
        book: "1 / 1.5",
      },
      padding: {
        theme: "3rem",
        responsive: "1.25rem",
      },
    },
  },
  plugins: [],
};
