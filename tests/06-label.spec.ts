import { test } from "./helpers/compare-fixture";

/**
 * #6: Label / Ticket
 * Entry point: order-handler.ts → handlePrintLabel()
 * Note: Label compare chưa được wire (label formatter expects pre-formatted input).
 * Test thủ công bằng cách chuyển sang useNewPrintSystem: true.
 */
test.describe("6. Label", () => {
  test.setTimeout(120_000);

  test.skip("Label printing (manual comparison required)", async ({ page }) => {
    // TODO: Create order with items that have label printers assigned → Print
    // So sánh thủ công giữa old và new flow
  });
});
