import { test } from "./helpers/compare-fixture";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";
import { normalOrder } from "./scenarios/order";
import { printStaffReport } from "./scenarios/print-report";

/**
 * #10: Staff Report
 * Entry point: staff-report.service.ts → onPrintStaffReport()
 * Console log: ✅ [staff-report] MATCH
 */
test.describe("10. Staff Report", () => {
  test.setTimeout(120_000);

  test("Print Staff Report", async ({ page, testDir }) => {
    await normalOrder(page);
    await printStaffReport(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
