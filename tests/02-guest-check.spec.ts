import { test } from "./helpers/compare-fixture";
import { unpaidBill } from "./scenarios/unpaid-bill";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";

/**
 * #2: Invoice (Guest Check / Unpaid Bill)
 * Entry point: print-invoice.ts → printInvoice(order, GUEST_CHECK)
 * Console log: ✅ [guest-check] MATCH
 */
test.describe("2. Guest Check", () => {
  test.setTimeout(120_000);

  test("Unpaid bill", async ({ page, testDir }) => {
    await unpaidBill(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
