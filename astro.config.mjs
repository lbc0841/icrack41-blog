// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  site: 'https://lbc0841.github.io',
  base: 'icrack41-blog', 

  server: {
    host: '0.0.0.0',
    port: 4321
  },
});