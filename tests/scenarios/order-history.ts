import { Page } from "@playwright/test";

// Phần 3: Red Invoice / Cancellation
// Vào Order History → chọn order đã thanh toán → Print → Red Bill
export async function redBill(page: Page) {
  await page.getByText("Order History").click();
  await page.waitForTimeout(1000);
  await page.locator(".border-\\[2px\\]").click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Print" }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Red Bill" }).click();
  await page.waitForTimeout(2000);
}

// Phần 4: Full Refund từ Order History
export async function fullRefund(page: Page) {
  await page.getByText("Order History").click();
  await page.waitForTimeout(1000);
  await page.locator(".border-\\[2px\\]").click();
  await page.waitForTimeout(500);
  await page
    .locator(".w-\\[30px\\].relative.h-\\[30px\\].Tablet_600\\:w-7")
    .click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Refund" }).click();
  await page.waitForTimeout(500);
  await page.getByLabel("").check();
  await page.waitForTimeout(300);
  await page.getByText("Next").click();
  await page.waitForTimeout(500);
  await page.getByText("Refund", { exact: true }).click();
  await page.waitForTimeout(500);
  await page.getByText("Refund", { exact: true }).nth(2).click();
  await page.waitForTimeout(2000);
}
