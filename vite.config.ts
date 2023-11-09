/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: [
        "src/entry-node.ts",
        "src/entry-browser.ts",
        "src/validators/zod.ts",
      ],
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
    visualizer(),
    dts({
      exclude: ["./src/*.spec.ts"],
      rollupTypes: true,
    }),
  ],
});
