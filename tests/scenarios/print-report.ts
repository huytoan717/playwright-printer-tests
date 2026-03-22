import { Page } from "@playwright/test";
import { runInConsole } from "../helpers";

// #7: X Report — eod.service.ts → onPrintX()
export async function printXReport(page: Page) {
  // Place any order to have data in the report
  await page.getByText("Reports").click();
  await page.getByText("End Of Day").click();
  await page.getByText("X-Report").click();
  await page.getByRole("button", { name: "Print" }).click();
}

// #8: Z Report — eod.service.ts → onPrintZ()
export async function printZReport(page: Page) {
  // Place any order to have data in the report
  await page.getByText("Reports").click();
  await page.getByText("End Of Day", { exact: true }).click();
  await page.getByText("Z-Report").click();
  await page.getByRole("button", { name: "Close Shift & Print" }).click();
}

// #9: Z Report Reprint — eod.service.ts → onReprintZ()
export async function reprintZReport(page: Page) {
  // Need to have at least 2 Z-Report printed in the past to see the "Reprint Z-Report" button
  await page.getByText("Reports").click();
  await page.getByText("End Of Day", { exact: true }).click();
  await page.getByText("Z-Report").click();
  await page.getByRole("button", { name: "OK" }).click();
}

// #10: Staff Report — staff-report.service.ts → onPrintStaffReport()
export async function printStaffReport(page: Page) {
  // Place any order to have data in the report
  await page.getByText("Reports").click();
  await page.getByText("Staff Report").click();
  await page
    .getByRole("button", { name: "Print Z-Report Print report" })
    .click();
}

// #11: Monthly Report — monthly-report.service.ts → onPrintMonthlyReport()
export async function printMonthlyReport(page: Page) {
  // Place any order to have data in the report
  await page.getByText("Reports").click();
  await page.getByText("Monthly Report").click();
  await page.getByText("Print Z-Report").click();
}

// #13: Cashbook Report — cashbook.service.ts → closeDay()
export async function printCashbookReport(page: Page) {
  // TODO: Add cashbook transactions → Go to Cashbook → Close Day
  await runInConsole(
    page,
    `
      generalSetting0().cashbookEnable = true;
    `,
  );
  await page.getByText("Reports").click();
  await page.getByText("Cashbook", { exact: true }).click();
  await page.getByText("Close Day").click();
  await page.locator("b").filter({ hasText: "OK" }).click();
}

// #20: Staff Shifts Report — PrintShiftPopup.tsx → onConfirm()
export async function printStaffShiftsReport(page: Page) {
  // Place any order to have data in the report
  await page.getByText("Reports").click();
  await page.getByText("Staff Report").click();
  await page
    .getByRole("button", { name: "Print Z-Report Print report" })
    .click();
}
