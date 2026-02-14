import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  output: 'static',
  vite: {
    plugins: [glsl()],
    optimizeDeps: {
      exclude: ['three'] // prevent three from being bundled too early
    }
  }
});