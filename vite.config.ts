import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const babelPlugins = [
  [
    "babel-plugin-styled-components",
    {
      displayName: true,
      fileName: false,
    },
  ],
];

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: babelPlugins,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
