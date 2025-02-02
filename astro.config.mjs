// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import svelte from '@astrojs/svelte';
// https://astro.build/config
export default defineConfig({
  site: 'https://maritvanderloos.github.io',
  base: 'portfolio',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
})