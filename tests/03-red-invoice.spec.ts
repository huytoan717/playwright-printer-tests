import { test } from "./helpers/compare-fixture";
import { normalOrder } from "./scenarios/order";
import { redBill } from "./scenarios/order-history";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";

/**
 * #3: Invoice (Red Invoice / Cancellation)
 * Entry point: print-invoice.ts → printInvoice(order, RED_INVOICE)
 * Console log: ✅ [red-invoice] MATCH
 */
test.describe("3. Red Invoice", () => {
  test.setTimeout(120_000);

  test("Cancel order and print red invoice", async ({ page, testDir }) => {
    await normalOrder(page);
    await redBill(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
