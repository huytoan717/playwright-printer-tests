import { test } from "./helpers/compare-fixture";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";
import { normalOrder } from "./scenarios/order";
import { printCashbookReport } from "./scenarios/print-report";

/**
 * #13: Cashbook Report
 * Entry point: cashbook.service.ts → closeDay()
 */
test.describe("13. Cashbook Report", () => {
  test.setTimeout(120_000);

  test("Print Cashbook Report", async ({ page, testDir }) => {
    await normalOrder(page);
    await printCashbookReport(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
