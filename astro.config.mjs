// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  integrations: [
    sanity({
      projectId: "pn49njsr",
      dataset: "production",
      useCdn: false,
    }),
  ],
});
