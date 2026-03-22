import { test } from "./helpers/compare-fixture";
import { normalOrder } from "./scenarios/order";
import { printStaffReport } from "./scenarios/print-report";

/**
 * #10: Staff Report
 * Entry point: staff-report.service.ts → onPrintStaffReport()
 * Console log: ✅ [staff-report] MATCH
 */
test.describe("10. Staff Report", () => {
  test.setTimeout(120_000);

  test("Print Staff Report", async ({ page }) => {
    await normalOrder(page);
    await printStaffReport(page);
  });
});
