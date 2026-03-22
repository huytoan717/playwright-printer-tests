import { test } from "./helpers/compare-fixture";
import { normalOrder } from "./scenarios/order";
import { fullRefund } from "./scenarios/order-history";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";

/**
 * #4: Invoice (Cancel/Refund from Order History)
 * Entry point: order-history.service.ts → handlePrintCancelRefundOrder()
 * Console log: ✅ [invoice] MATCH
 */
test.describe("4. Cancel/Refund", () => {
  test.setTimeout(120_000);

  test("Refund order from history", async ({ page, testDir }) => {
    await normalOrder(page);
    await fullRefund(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
