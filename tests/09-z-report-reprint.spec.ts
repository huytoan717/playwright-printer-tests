import { test } from "./helpers/compare-fixture";
import { reprintZReport } from "./scenarios/print-report";

/**
 * #9: Z Report Reprint
 * Entry point: eod.service.ts → onReprintZ()
 * Console log: ✅ [z-report-reprint] MATCH
 * ⚠️ Cần có ít nhất 2 Z-Report đã in trước đó.
 */
test.describe("9. Z Report Reprint", () => {
  test.setTimeout(120_000);

  test("Reprint Z Report", async ({ page }) => {
    await reprintZReport(page);
  });
});
