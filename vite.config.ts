/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from './package.json' assert { type: 'json' }


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
      external: [
        ...Object.keys(pkg.optionalDependencies), // don't bundle dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
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
      entryRoot: "src",
    }),
  ],
});
