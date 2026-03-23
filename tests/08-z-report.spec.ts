import { test } from "./helpers/compare-fixture";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";
import { normalOrder } from "./scenarios/order";
import { printZReport } from "./scenarios/print-report";

/**
 * #8: Z Report (End of Day)
 * Entry point: eod.service.ts → onPrintZ()
 * Console log: ✅ [z-report] MATCH
 * ⚠️ Lưu ý: Thao tác này tạo EOD record — chỉ chạy khi thực sự muốn close day.
 */
test.describe("8. Z Report", () => {
  test.setTimeout(120_000);

  test("Print Z Report (close shift)", async ({ page, testDir }) => {
    await normalOrder(page);
    await printZReport(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
