import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

export default class CustomReporter implements Reporter {
  private readonly results = new Map<
    string,
    { test: TestCase; result: TestResult }
  >();
  private startedAt = 0;

  onBegin(): void {
    this.startedAt = Date.now();
    console.log("\nCustom test summary");
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.results.set(test.id, { test, result });
  }

  onEnd(result: FullResult): void {
    const testResults = [...this.results.values()];
    const passed = testResults.filter(
      ({ result: testResult }) => testResult.status === "passed",
    );
    const skipped = testResults.filter(
      ({ result: testResult }) => testResult.status === "skipped",
    );
    const failed = testResults.filter(
      ({ result: testResult }) =>
        testResult.status !== "passed" && testResult.status !== "skipped",
    );
    const flaky = passed.filter(({ result: testResult }) => testResult.retry > 0);
    const durationSeconds = ((Date.now() - this.startedAt) / 1000).toFixed(2);

    console.log(
      [
        `Result: ${result.status}`,
        `Passed: ${passed.length}`,
        `Failed: ${failed.length}`,
        `Skipped: ${skipped.length}`,
        `Flaky: ${flaky.length}`,
        `Duration: ${durationSeconds}s`,
      ].join(" | "),
    );

    for (const { test, result: testResult } of failed) {
      console.error(
        `Failed: ${test.title} (${test.location.file}:${test.location.line}) - ${testResult.status}`,
      );
    }
  }
}
