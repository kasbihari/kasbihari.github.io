import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';  // default import, geen { }

export default defineConfig({
  site: 'https://kasbihari.github.io',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});