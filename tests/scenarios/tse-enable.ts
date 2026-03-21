import { Page } from '@playwright/test';

export async function tseEnable(page: Page) {
  await page.getByTestId('FloorPlanView').getByText('8', { exact: true }).click();
  await page.getByText('Samosa').click();
}