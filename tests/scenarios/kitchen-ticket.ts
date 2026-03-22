import { Page } from "@playwright/test";
import { swipe } from "../helpers/swipe";

// Tạo order với items thuộc nhiều nhóm bếp khác nhau
export async function kitchenMultiPrinterGroups(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("7", { exact: true })
    .click();
  await page.getByTestId("OrderViewV2").getByText("Samosa").click();
  await page.getByTestId("OrderViewV2").getByText("French Fries").click();
  await page.getByTestId("OrderViewV2").getByText("Garlic Bread").click();
  await page.getByTestId("OrderViewV2").getByText("Mojito").click();
  await page.getByTestId("OrderViewV2").getByText("Blue Haiwaii").click();
  await page.getByTestId("OrderViewV2").getByText("Whiskey Chivas 8").click();
  await page.getByRole("button", { name: "$" }).click();
}

// Tạo order với items có modifier
export async function kitchenWithModifiers(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Chop Suey").click();
  await page.locator("span").filter({ hasText: "Medium - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Salmon Pine").click();
  await page.locator("span").filter({ hasText: "Medium - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Wakame").click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Beef Tataki").click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("16. Texas BBQ").click();
  await page.locator("span").filter({ hasText: "Onion Sauce - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Spare Ribs").click();
  await page.locator("span").filter({ hasText: "Cinnamon - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "$" }).click();
}

// Tạo order với items có course khác nhau
export async function kitchenWithCourses(page: Page) {
  await page.getByText("11", { exact: true }).click();
  await page.getByTestId("OrderViewV2").getByText("Samosa").click();
  await page.getByTestId("OrderViewV2").getByText("French Fries").click();
  await page.getByTestId("OrderViewV2").getByText("Garlic Bread").click();
  await page.getByText("Tabbouleh").click();
  await page.getByText("Miso Soup").click();
  await page.getByText("Spring Rolls").click();

  // Vuốt phải để gán course tăng dần (1 lần = Course: 2, 2 lần = Course: 3, ...)
  const items = ['Samosa', 'French Fries', 'Garlic Bread', 'Tabbouleh', 'Miso Soup'];
  for (let i = 0; i < items.length; i++) {
    await swipe(
      page.locator('b').filter({ hasText: items[i] }),
      'right',
      { distance: 200, times: i + 1 },
    );
    await page.waitForTimeout(500);
  }

  await page.getByRole("button", { name: "$" }).click();
}

// Tạo order, in kitchen, rồi xóa item và in lại (cancel items)
export async function kitchenCancelItems(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").click();
  await page.getByText("French Fries").click();
  await page.getByText("Garlic Bread").click();
  await page.getByText("Tabbouleh").click();
  await page.getByText("Miso Soup").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(1000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page
    .locator(
      "div:nth-child(3) > .self-stretch.flex.flex-row.items-center > .relative.shrink-0.flex > .relative.mr-\\[-14px\\] > .minusvector-red--\\%123",
    )
    .click();
  await page
    .locator(
      "div:nth-child(4) > .self-stretch.flex.flex-row.items-center > .relative.shrink-0.flex > .relative.mr-\\[-14px\\] > .minusvector-red--\\%123",
    )
    .click();
  await page.getByRole("button", { name: "$" }).click();
}

// In lại kitchen ticket (reprint)
export async function kitchenReprint(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("7", { exact: true })
    .click();
  await page.getByText("Samosa").click();
  await page.getByText("French Fries").click();
  await page.getByText("Garlic Bread").click();
  await page.getByText("Spring Rolls").click();
  await page.getByText("Bruschetta").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(1000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("7", { exact: true })
    .click();
  await page.locator(".relative.w-10.h-10.object-cover.mq1440\\:w-12").click();
  await page.getByText("Reprint to Kitchen").first().click();
}

// Order có thông tin khách hàng (delivery)
export async function kitchenWithCustomerInfo(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("7", { exact: true })
    .click();
  await page.getByTestId("OrderViewV2").getByText("Samosa").click();
  await page.getByTestId("OrderViewV2").getByText("French Fries").click();
  await page.getByTestId("OrderViewV2").getByText("Garlic Bread").click();
  await page.getByText("Tabbouleh").click();
  await page.getByText("Miso Soup").click();
  await page
    .locator(".relative.w-10.h-10.object-cover.mq1440\\:w-12")
    .first()
    .click();
  await page.getByText("Add Customer").first().click();
  await page.locator(".flex-grow.min-w-\\[20px\\]").first().click();
  await page.keyboard.type("Nguyen Van A", { delay: 100 });
  await page
    .locator(
      ".relative.cursor-text.h-\\[50px\\].pl-\\[14px\\] > .absolute > .overflow-auto > .flex-grow",
    )
    .first()
    .click();
  await page.keyboard.type("0123456789", { delay: 100 });
  await page
    .locator(".pt-4 > fieldset > .absolute > .overflow-auto > .flex-grow")
    .first()
    .click();
  await page.keyboard.type("123 Le Loi, District 1, HCM", { delay: 100 });
  await page.getByText("Add", { exact: true }).click();
  await page.getByRole("button", { name: "$" }).click();
}

// Order takeaway
export async function kitchenTakeaway(page: Page) {
  await page.getByTestId("FloorPlanView").getByText("10").click();
  await page.getByTestId("OrderViewV2").getByText("Samosa").click();
  await page.getByTestId("OrderViewV2").getByText("French Fries").click();
  await page.getByTestId("OrderViewV2").getByText("Garlic Bread").click();
  await page.getByTestId("OrderViewV2").getByText("Spring Rolls").click();
  await page.getByTestId("OrderViewV2").getByText("Bruschetta").click();
  await page.getByText("Take Away").click();
  await page.getByRole("button", { name: "$" }).click();
}
