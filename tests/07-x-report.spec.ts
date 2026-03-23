import { test } from "./helpers/compare-fixture";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";
import { normalOrder } from "./scenarios/order";
import { printXReport } from "./scenarios/print-report";

/**
 * #7: X Report
 * Entry point: eod.service.ts → onPrintX()
 * Console log: ✅ [x-report] MATCH
 */
test.describe("7. X Report", () => {
  test.setTimeout(120_000);

  test("Print X Report", async ({ page, testDir }) => {
    await normalOrder(page);
    await printXReport(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
