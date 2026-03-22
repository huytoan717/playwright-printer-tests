import { test } from "./helpers/compare-fixture";
import { normalOrder } from "./scenarios/order";
import { printCashbookReport } from "./scenarios/print-report";

/**
 * #13: Cashbook Report
 * Entry point: cashbook.service.ts → closeDay()
 */
test.describe("13. Cashbook Report", () => {
  test.setTimeout(120_000);

  test("Print Cashbook Report", async ({ page }) => {
    await normalOrder(page);
    await printCashbookReport(page);
  });
});
