/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'], // Gebruik class-strategie voor dark mode
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: {
		  // Alleen voor de naam gebruiken we Amsterdam Four (via class)
		  name: ['"Amsterdam Four"', 'sans-serif'],
		  // Voor alle andere tekst Playfair Display
		  body: ['"Playfair Display"', 'serif'],
		},
		colors: {
		  // Jouw nieuwe kleuren
		  black: '#0A0A0A',
		  white: '#FFFFFF',
		  anthracite: '#2C2C2C',
		  bordeaux: '#5E2A2C',
  
		  // Optioneel: extra schakeringen voor gradients
		  'bordeaux-light': '#7A3E40',
		  'anthracite-light': '#3A3A3A',
  
		  // shadcn variabelen – houden we, maar we passen de HSL-waarden later aan in global.css
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			1: 'hsl(var(--chart-1))',
			2: 'hsl(var(--chart-2))',
			3: 'hsl(var(--chart-3))',
			4: 'hsl(var(--chart-4))',
			5: 'hsl(var(--chart-5))',
		  },
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		// Gradients als utilities
		backgroundImage: {
		  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
		  'gradient-subtle': 'linear-gradient(145deg, var(--tw-gradient-stops))',
		},
	  },
	},
	plugins: [require('tailwindcss-animate')],
  };