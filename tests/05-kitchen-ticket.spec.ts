import { test } from "./helpers/compare-fixture";
import { runInConsole } from "./helpers/run-in-console";
import {
  kitchenMultiPrinterGroups,
  kitchenWithModifiers,
  kitchenWithCourses,
  kitchenCancelItems,
  kitchenReprint,
  kitchenWithCustomerInfo,
  kitchenTakeaway,
} from "./scenarios/kitchen-ticket";

/**
 * #5: Kitchen Ticket
 * Entry point: order-handler.ts → onKitchenPrint()
 * Console log: ✅ [kitchen] MATCH (mỗi kitchen printer group)
 */
test.describe("5. Kitchen Ticket", () => {
  test.setTimeout(120_000);

  test("Items from different kitchen printer groups", async ({ page }) => {
    await kitchenMultiPrinterGroups(page);
  });

  test("Items with modifiers", async ({ page }) => {
    await kitchenWithModifiers(page);
  });

  test("Items with different courses", async ({ page }) => {
    await kitchenWithCourses(page);
  });

  test("Cancel items (print, remove, reprint)", async ({ page }) => {
    await kitchenCancelItems(page);
  });

  test("Reprint kitchen ticket", async ({ page }) => {
    await kitchenReprint(page);
  });

  test("Order with customer info (delivery)", async ({ page }) => {
    await kitchenWithCustomerInfo(page);
  });

  test("Takeaway order", async ({ page }) => {
    await kitchenTakeaway(page);
  });

  test("All variations - full run", async ({ page }) => {
    await kitchenMultiPrinterGroups(page);
    await kitchenWithModifiers(page);
    await kitchenWithCourses(page);
    await kitchenCancelItems(page);
    await kitchenReprint(page);
    await kitchenWithCustomerInfo(page);
    await kitchenTakeaway(page);
    await runInConsole(page, `__printCompareReport()`);
  });
});
