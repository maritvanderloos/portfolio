// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import svelte from '@astrojs/svelte';
// https://astro.build/config
export default defineConfig({
  // site: 'https://maritvanderloos.github.io',
  site: 'https://maritvanderloos.nl',
  // base: 'portfolio',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
})