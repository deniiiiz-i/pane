import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // creating a Next.js app and installing every component takes minutes
    hookTimeout: 10 * 60 * 1000,
    testTimeout: 2 * 60 * 1000,
  },
});
