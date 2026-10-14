import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base:
    command === "build" && process.env.GITHUB_ACTIONS
      ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1]}/`
      : "/",
  build: {
    rollupOptions: {
      output: { manualChunks: { three: ["three", "@react-three/fiber"] } },
    },
  },
}));
