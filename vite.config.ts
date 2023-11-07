/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: ["src/entry-node.ts", "src/entry-browser.ts"],
      output: [
        {
          dir: "dist",
          format: "esm",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: ({ name: fileName }) => {
            return `${fileName}.mjs`;
          },
        },
        {
          dir: "dist",
          format: "commonjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: ({ name: fileName }) => {
            return `${fileName}.cjs`;
          },
        },
      ],
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, "src/countries"),
          dest: resolve(__dirname, "dist"),
        },
      ],
    }),
    visualizer(),
    dts({
      exclude: ["./src/*.spec.ts"],
      rollupTypes: true,
    }),
  ],
});
