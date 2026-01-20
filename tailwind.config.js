/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Je bordeaux thema kleuren
        'bg': '#0f0b0d',
        'bg-2': '#1a1116',
        'bg-3': '#24161d',
        'ink': '#f2e9ee',
        'ink-2': '#d9c9d0',
        'accent': '#7f1126',
        'accent-2': '#b41c3b',
        'link': '#ff466d',
        'success': '#7ddb7c',
      },
      fontFamily: {
        'amsterdam': ['"Amsterdam Four"', 'cursive'],
        'playfair': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'custom': '18px',
        'custom-sm': '12px',
      },
      boxShadow: {
        'custom-1': '0 10px 30px rgba(0, 0, 0, 0.25)',
        'custom-2': '0 30px 70px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'typewriter': 'typewriter 2s steps(11) 1s 1 normal both',
        'blink': 'blink 1s steps(2) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          from: { 'border-right-color': 'transparent' },
          to: { 'border-right-color': 'white' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
