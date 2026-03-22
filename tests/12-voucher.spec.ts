import { test } from "./helpers/compare-fixture";
import { orderWithVoucherPayment } from "./scenarios/order";
import { createVoucher, printSingleVoucher } from "./scenarios/voucher";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";

/**
 * #12: Voucher
 * Entry point: print-voucher.ts → printSingleVoucher(), payment-handler.ts → updateVouchersPostPay()
 */
test.describe("12. Voucher", () => {
  test.setTimeout(120_000);

  test("Order with voucher payment", async ({ page, testDir }) => {
    await createVoucher(page);
    await orderWithVoucherPayment(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test.skip("Print single voucher from management", async ({ page }) => {
    await createVoucher(page);
    await printSingleVoucher(page);
  });
});
