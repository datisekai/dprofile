/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ {
      mytheme: {
        primary: "#cc66ff",
        secondary: "#ffffff1a",
        accent: "#2e026d",
        neutral: "#15162c",
        "base-100": "#ffffff",
      },
    },"light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
};

module.exports = config;
