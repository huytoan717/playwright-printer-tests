import { test as base } from '@playwright/test';
import { setupLogCapture } from './log-capture';
import { setupPage } from './page-setup';
import { createTestOutputDir } from './test-output';

/**
 * Fixture chung cho tất cả compare mode tests.
 * Tự động: tạo thư mục output, bắt log, mở trang web, bật compare mode.
 *
 * Sử dụng:
 *   import { test } from './helpers/compare-fixture';
 *
 *   test('Normal order', async ({ page, testDir }) => {
 *     await normalOrder(page);
 *   });
 */
export const test = base.extend<{ testDir: string }>({
  testDir: async ({ page }, use, testInfo) => {
    const testDir = createTestOutputDir(testInfo.title);

    // Bắt log console
    setupLogCapture(page, testDir);

    // Mở trang web, bật compare mode
    await setupPage(page, {
      'posSetting0().printerGeneralSetting.useNewPrintSystem': 'compare',
    });

    await use(testDir);
  },
});

export { expect } from '@playwright/test';
