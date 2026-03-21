import { test } from "@playwright/test";
import { setupLogCapture } from "./helpers/log-capture";
import { setupPage } from "./helpers/page-setup";
import { createTestOutputDir } from "./helpers/test-output";
import {
  normalOrder,
  orderWithNote,
  orderWithSeatMode,
} from "./scenarios/order";
import {
  navigateToInvoiceList,
  scrollAndCaptureInvoices,
} from "./scenarios/invoice-management";
import { createVoucher } from "./scenarios/create-voucher";

test("Record actions and capture print:compare logs", async ({ page }) => {
  test.setTimeout(120_000);
  const testDir = createTestOutputDir(test.info().title);

  setupLogCapture(page, testDir);

  await setupPage(page, {
    "posSetting0().printerGeneralSetting.useNewPrintSystem": "compare",
  });

  // await normalOrder(page);
  // await navigateToInvoiceList(page);
  // await scrollAndCaptureInvoices(page, testDir);
  // await createVoucher(page);
  await orderWithSeatMode(page);
  await navigateToInvoiceList(page);
  await scrollAndCaptureInvoices(page, testDir);
  await page.pause();
});
