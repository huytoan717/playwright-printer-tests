import { Page } from "@playwright/test";

// Tạo và xuất (export) một hàm chứa các bước của bạn
export async function normalOrder(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("8", { exact: true })
    .click();
  await page.getByText("Samosa").click();
  await page.getByText("French Fries").click();
  await page.getByText("Garlic Bread").click();
  await page.getByText("Mojito").click();
  await page.getByText("Blue Haiwaii").click();
  await page.getByText("Whiskey Chivas 8").click();
  await page.getByText("Red Wine").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("8", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithModifier(page: Page) {
  await page.getByTestId("FloorPlanView").getByText("10").click();
  await page.getByText("Chop Suey").click();
  await page.locator("span").filter({ hasText: "Medium - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Exotic Fruit").click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("16. Texas BBQ").click();
  await page.locator("span").filter({ hasText: "Onion Sauce - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Kobe Beef Brisket").click();
  await page.locator("span").filter({ hasText: "Cinnamon - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Bruschetta").click();
  await page.getByText("Spicy Sauce").click();
  await page.getByText("27. Cinnamon").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page.getByTestId("FloorPlanView").getByText("10").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithDiscountPercentage(page: Page) {
  await page.getByTestId("FloorPlanView").getByText("12").click();
  await page.getByText("Samosa").click();
  await page.getByText("Miso Soup").click();
  await page.getByText("Spring Rolls").click();
  await page.getByText("French Fries").click();
  await page.getByText("Discount").click();
  await page.getByRole("button", { name: "50%" }).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page.getByTestId("FloorPlanView").getByText("12").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithDiscountAmount(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("7", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("Miso Soup").first().click();
  await page.getByText("Spring Rolls").first().click();
  await page.getByText("Bruschetta").first().click();
  await page.getByText("Discount").click();
  await page.getByRole("button", { name: "20", exact: true }).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("7", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithTip(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("Miso Soup").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Bruschetta").first().click();
  await page.getByText("Wakame").first().click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Tip: 10% $" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithServiceCharge(page: Page) {
  await page.getByTestId("FloorPlanView").getByText("11").click();
  await page.getByText("Samosa").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Garlic Bread").first().click();
  await page.getByText("Wakame").first().click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page.getByTestId("FloorPlanView").getByText("11").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "SF: 15 % $" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithMultiplePaymentMethods(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Garlic Bread").first().click();
  await page.getByText("Wakame").first().click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByText("Multi").click();
  await page.getByText("Card").click();
  await page.locator("b").filter({ hasText: /^2$/ }).nth(5).click();
  await page
    .locator(".self-stretch.flex-1.flex > div:nth-child(4) > div > .flex-1")
    .first()
    .click();
  await page.getByText("Cash").click();
  await page.locator(".absolute.object-cover.h-full").first().click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderFastCheckout(page: Page) {
  await page.getByText("Fast Checkout").click();
  await page.getByText("Samosa").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Garlic Bread").first().click();
  await page.getByText("Tabbouleh").first().click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Complete" }).click();
}

export async function orderTakeAway(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Garlic Bread").first().click();
  await page.getByText("Wakame").first().click();
  await page.locator("span").filter({ hasText: "Large - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Take Away").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithCustomerInfo(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("Miso Soup").first().click();
  await page.getByText("Spring Rolls").first().click();
  await page.getByText("Wakame").first().click();
  await page.locator("span").filter({ hasText: "Medium - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Beef Tataki").click();
  await page.locator("span").filter({ hasText: "Medium - $" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page
    .locator(".relative.w-10.h-10.object-cover.mq1440\\:w-12")
    .first()
    .click();
  await page.getByText("Add Customer").first().click();
  await page.locator(".flex-grow.min-w-\\[20px\\]").first().click();
  await page.locator("#portals").getByText("123", { exact: true }).click();
  await page.waitForTimeout(200);
  await page
    .locator(".self-stretch.flex-1 > div:nth-child(10) > .relative")
    .first()
    .click();
  await page.waitForTimeout(200);
  await page
    .locator(".self-stretch.flex-1.rounded-8xs-6 > .relative")
    .first()
    .click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".self-stretch.flex-1.flex.flex-row.items-center.justify-center.gap-\\[8px\\] > div:nth-child(2) > .relative",
    )
    .first()
    .click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".self-stretch.flex-1.flex.flex-row.items-center.justify-center.gap-\\[8px\\] > div:nth-child(3) > .relative",
    )
    .first()
    .click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".self-stretch.flex-1.flex.flex-row.items-center.justify-center.gap-\\[8px\\] > div:nth-child(4) > .relative",
    )
    .first()
    .click();
  await page.waitForTimeout(200);
  await page
    .locator(".self-stretch.flex-1 > div:nth-child(5) > .relative")
    .first()
    .click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".relative.cursor-text.h-\\[50px\\].pl-\\[14px\\] > .absolute > .overflow-auto > .flex-grow",
    )
    .first()
    .click();
  await page.waitForTimeout(200);
  await page.getByText("ABC").click();
  await page.waitForTimeout(200);
  await page.getByText("a", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("b", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("c", { exact: true }).click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".relative.w-full > .relative > .absolute > .overflow-auto > .flex-grow",
    )
    .click();
  await page.waitForTimeout(200);
  await page.getByText("w", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).first().click();
  await page.waitForTimeout(200);
  await page.getByText("e", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("r", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("e", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page.getByText("Add", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithNote(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Garlic Bread").first().click();
  await page.getByText("Tabbouleh").first().click();
  await page.getByText("Miso Soup").first().click();
  await page
    .locator(".relative.w-10.h-10.object-cover.mq1440\\:w-12")
    .first()
    .click();
  await page.getByText("Invoice Note").first().click();
  await page.locator(".flex-grow.min-w-\\[20px\\]").click();
  await page.getByText("t", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).first().click();
  await page.waitForTimeout(200);
  await page.getByText("i", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).first().click();
  await page.waitForTimeout(200);
  await page.getByText("e", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("m", { exact: true }).click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".self-stretch.flex-1.gap-\\[3px\\] > .rounded-8xs-6.bg-\\[\\#fcfcfe\\].shadow-\\[0px_1px_0px_\\#898a8d\\].flex.flex-col.items-center.justify-center.relative",
    )
    .click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page.getByText("e", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page.getByText("r", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("a", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("n", { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).nth(2).click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".self-stretch.flex-1.gap-\\[3px\\] > .rounded-8xs-6.bg-\\[\\#fcfcfe\\].shadow-\\[0px_1px_0px_\\#898a8d\\].flex.flex-col.items-center.justify-center.relative",
    )
    .click();
  await page.waitForTimeout(200);
  await page.getByText("t", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).nth(3).click();
  await page.waitForTimeout(200);
  await page.getByText("e", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page.getByText("m", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page
    .locator(
      ".self-stretch.flex-1.gap-\\[3px\\] > .rounded-8xs-6.bg-\\[\\#fcfcfe\\].shadow-\\[0px_1px_0px_\\#898a8d\\].flex.flex-col.items-center.justify-center.relative",
    )
    .click();
  await page.waitForTimeout(200);
  await page.getByText("t", { exact: true }).nth(2).click();
  await page.waitForTimeout(200);
  await page.getByText("h", { exact: true }).nth(4).click();
  await page.waitForTimeout(200);
  await page.getByText("i", { exact: true }).nth(1).click();
  await page.waitForTimeout(200);
  await page.getByText("t", { exact: true }).nth(3).click();
  await page.waitForTimeout(200);
  await page.getByText("Add").click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithVoucherPayment(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByText("Samosa").first().click();
  await page.getByText("French Fries").first().click();
  await page.getByText("Garlic Bread").first().click();
  await page.getByText("Voucher").first().click();
  await page.locator(".flex-grow.min-w-\\[20px\\]").first().click();
  await page.waitForTimeout(200);
  await page.keyboard.type("12345678", { delay: 100 });
  await page.getByText("Add").nth(1).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function orderWithSeatMode(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.waitForTimeout(300);

  await page.getByText("Samosa").first().click();
  await page.waitForTimeout(200);

  await page.getByText("French Fries").first().click();
  await page.waitForTimeout(200);

  await page.getByText("Garlic Bread").first().click();
  await page.waitForTimeout(200);

  await page.getByText("Tabbouleh").first().click();
  await page.waitForTimeout(200);

  await page.getByText("Miso Soup").first().click();
  await page.waitForTimeout(200);

  await page.getByText("Spring Rolls").first().click();
  await page.waitForTimeout(200);

  await page.getByText("Bruschetta").first().click();
  await page.waitForTimeout(300);

  await page.getByTestId("OrderViewV2").getByText("Split Bill").click();
  await page.waitForTimeout(500);

  const orderView = page.getByTestId("OrderViewV2");

  await orderView.locator("b").filter({ hasText: "Samosa" }).click();
  await page.waitForTimeout(150);

  await orderView.locator("b").filter({ hasText: "French Fries" }).click();
  await page.waitForTimeout(150);

  await orderView.locator("b").filter({ hasText: "Garlic Bread" }).click();
  await page.waitForTimeout(300);

  await orderView.getByText("Next").click();
  await page.waitForTimeout(400);

  await orderView.locator("b").filter({ hasText: "Tabbouleh" }).click();
  await page.waitForTimeout(150);

  await orderView.locator("b").filter({ hasText: "Miso Soup" }).click();
  await page.waitForTimeout(300);

  await orderView.getByText("Next").click();
  await page.waitForTimeout(400);

  await orderView.locator("b").filter({ hasText: "Spring Rolls" }).click();
  await page.waitForTimeout(150);

  await orderView.locator("b").filter({ hasText: "Bruschetta" }).click();
  await page.waitForTimeout(300);

  await page.getByText("Done", { exact: true }).click();
  await page.waitForTimeout(500);

  await page.getByRole("button", { name: /^\$[\d.]+$/ }).click();
  await page.waitForTimeout(2000);

  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: /^\$[\d.]+$/ }).click();
  await page.waitForTimeout(300);

  await page.getByText("Cash").click();
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: "Bill" }).click();
  await page.waitForTimeout(300);

  await page.locator("b").filter({ hasText: "OK" }).click();
  await page.waitForTimeout(500);

  await page.getByRole("button", { name: /Seat 2 \$[\d.]+/ }).click();
  await page.waitForTimeout(300);

  await page.getByText("Cash").click();
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: "Bill" }).click();
  await page.waitForTimeout(300);

  await page.locator("b").filter({ hasText: "OK" }).click();
  await page.waitForTimeout(500);

  await page.getByRole("button", { name: /Seat 3 \$[\d.]+/ }).click();
  await page.waitForTimeout(300);

  await page.getByText("Cash").click();
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: "Bill" }).click();
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}

export async function buyVoucher(page: Page) {
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByTestId("OrderViewV2").getByText("Voucher").click();
  await page.getByText("Create").click();
  await page.locator(".flex-grow.min-w-\\[20px\\]").first().click();
  await page.waitForTimeout(200);
  await page.keyboard.type("12345678", { delay: 100 });
  await page
    .locator(
      ".relative.cursor-text.h-\\[37px\\].pl-\\[14px\\] > .overflow-auto > .flex-grow",
    )
    .first()
    .click();
  await page.waitForTimeout(200);
  await page.keyboard.type("50", { delay: 100 });
  await page
    .locator(
      ".self-stretch.flex.flex-row.items-center > .flex-1.flex.flex-col.items-start.justify-center > .relative.cursor-text > .overflow-auto > .flex-grow",
    )
    .click();
  await page.waitForTimeout(200);
  await page.keyboard.type("Van A", { delay: 100 });
  await page
    .locator(
      "div:nth-child(2) > .relative.cursor-text > .overflow-auto > .flex-grow",
    )
    .click();
  await page.waitForTimeout(200);
  await page.keyboard.type("Nguyen", { delay: 100 });
  await page.getByText("Add").nth(2).click();
  await page.locator('b').filter({ hasText: 'OK' }).click();
  await page.getByRole("button", { name: "$" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByTestId("FloorPlanView")
    .getByText("9", { exact: true })
    .click();
  await page.getByRole("button", { name: "$" }).click();
  await page.getByRole("button", { name: "Bill", exact: true }).click();
  await page.getByRole("button", { name: "Complete" }).click();
  await page.waitForTimeout(2000);
}
