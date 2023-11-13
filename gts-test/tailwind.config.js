/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // sm: '480px',
        // md: '768px',
        // lg: '976px',
        // xl: '1440px',
      },
      boxShadow: {
        '3xl': '0px 0px 2.4px 0px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  plugins: [],
}