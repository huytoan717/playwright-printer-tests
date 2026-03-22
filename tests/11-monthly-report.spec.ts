import { test } from "./helpers/compare-fixture";
import { normalOrder } from "./scenarios/order";
import { printMonthlyReport } from "./scenarios/print-report";

/**
 * #11: Monthly Report
 * Entry point: monthly-report.service.ts → onPrintMonthlyReport()
 * Console log: ✅ [monthly-report] MATCH
 */
test.describe("11. Monthly Report", () => {
  test.setTimeout(120_000);

  test("Print Monthly Report", async ({ page }) => {
    await normalOrder(page);
    await printMonthlyReport(page);
  });
});
