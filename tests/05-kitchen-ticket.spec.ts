import { test } from "./helpers/compare-fixture";
import { runInConsole } from "./helpers/run-in-console";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";
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

  test("Items from different kitchen printer groups", async ({ page, testDir }) => {
    await kitchenMultiPrinterGroups(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Items with modifiers", async ({ page, testDir }) => {
    await kitchenWithModifiers(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Items with different courses", async ({ page, testDir }) => {
    await kitchenWithCourses(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Cancel items (print, remove, reprint)", async ({ page, testDir }) => {
    await kitchenCancelItems(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Reprint kitchen ticket", async ({ page, testDir }) => {
    await kitchenReprint(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with customer info (delivery)", async ({ page, testDir }) => {
    await kitchenWithCustomerInfo(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Takeaway order", async ({ page, testDir }) => {
    await kitchenTakeaway(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("All variations - full run", async ({ page, testDir }) => {
    await kitchenMultiPrinterGroups(page);
    await kitchenWithModifiers(page);
    await kitchenWithCourses(page);
    await kitchenCancelItems(page);
    await kitchenReprint(page);
    await kitchenWithCustomerInfo(page);
    await kitchenTakeaway(page);
    await runInConsole(page, `__printCompareReport()`);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
