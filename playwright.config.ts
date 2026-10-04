import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 30 * 1000, // 30000 ms (30 secs)
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"], // Detailed console output
    // ["line"], // One-line progress output
    // ["dot"], // Minimal console output
    ["html", { open: "never", outputFolder: "reports" }], // HTML report
    // ["json", { outputFile: "reports/results.json" }], // JSON report
    ["junit", { outputFile: "reports/results.xml" }], // JUnit XML report
    ["./utils/CustomReporter.ts"], // Custom reporter
    ["allure-playwright", { outputFolder: "allure-results" }], // Allure report
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
    viewport: { width: 1280, height: 720 }, // Consistent default viewport
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
    permissions: ["geolocation"], // Permissions for geolocation-based tests
  },
  grep: /@master/,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    /*
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    */
  ],
});