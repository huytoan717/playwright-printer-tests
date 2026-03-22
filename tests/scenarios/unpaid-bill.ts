import { Page } from "@playwright/test";

export async function unpaidBill(page: Page) {
  await page.getByTestId("FloorPlanView").getByText("11").click();
  await page.getByTestId("OrderViewV2").getByText("Samosa").click();
  await page.getByTestId("OrderViewV2").getByText("French Fries").click();
  await page.getByTestId("OrderViewV2").getByText("Garlic Bread").click();
  await page.getByText("Spring Rolls").click();
  await page.getByText("Bruschetta").click();
  await page
    .locator(".relative.w-10.h-10.object-cover.mq1440\\:w-12")
    .first()
    .click();
  await page.getByText("Unpaid Bill").first().click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(1000);
}
