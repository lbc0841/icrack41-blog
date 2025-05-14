// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],

  site: 'https://lbc0841.github.io',
  base: 'icrack41-blog',

  server: {
    host: '0.0.0.0',  // 允許區域網訪問
    port: 4321        // 默認端口，可選
  },
});