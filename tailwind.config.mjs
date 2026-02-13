/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Amsterdam Four"', 'sans-serif'],
        body: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'neon-white': '#f0f3fa',
        'deep': '#0a0c0f',
        'surface': '#111317',
        'glow': 'rgba(255,255,255,0.12)',
      },
    },
  },
  plugins: [],
};