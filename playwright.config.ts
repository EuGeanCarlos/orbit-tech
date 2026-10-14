import { defineConfig } from "@playwright/test";
const port = process.env.TEST_PORT || "5173";
const url = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: "./tests",
  use: { baseURL: url, browserName: "chromium" },
  webServer: {
    command: `npm run dev -- --port ${port} --strictPort`,
    url,
    reuseExistingServer: !process.env.CI,
  },
  reporter: "list",
});
