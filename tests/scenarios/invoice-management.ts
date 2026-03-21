import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { getInvoiceImagesDir } from '../helpers/test-output';
import { runInConsole } from '../helpers';

// Di chuyển đến màn hình danh sách hóa đơn
export async function navigateToInvoiceList(page: Page) {
  console.log('🔄 Đang di chuyển đến màn hình danh sách hóa đơn...');

  await runInConsole(page, `
    router.screen = 'VirtualPrinter';
  `);
  await page.waitForTimeout(2000);
}

// Tự động cuộn và bóc xuất ảnh toàn bộ hóa đơn
export async function scrollAndCaptureInvoices(page: Page, testDir: string) {
  const imagesDir = getInvoiceImagesDir(testDir);
  const v1Dir = path.join(imagesDir, 'v1');
  const v2Dir = path.join(imagesDir, 'v2');

  console.log(`📸 Bắt đầu quét, cuộn và chụp → ${imagesDir}`);

  const scroller = page.getByTestId('virtuoso-scroller');
  await scroller.waitFor({ state: 'visible' });

  const capturedInvoices = new Set<string>();
  let isScrolling = true;

  while (isScrolling) {
    const visibleInvoices = page.locator('div[data-index]');
    const count = await visibleInvoices.count();

    for (let i = 0; i < count; i++) {
      const invoice = visibleInvoices.nth(i);
      const index = await invoice.getAttribute('data-index');

      if (index !== null && !capturedInvoices.has(index)) {
        await invoice.scrollIntoViewIfNeeded();

        // Kiểm tra hóa đơn thuộc V1 hay V2
        const v2Label = invoice.getByText('V2', { exact: true });
        const isV2 = await v2Label.isVisible();

        const targetDir = isV2 ? v2Dir : v1Dir;
        const tag = isV2 ? 'v2' : 'v1';
        const filePath = path.join(targetDir, `invoice-${index}-${tag}.png`);

        // Lấy src của thẻ img và bóc xuất ảnh base64
        const imgElement = invoice.locator('img').first();
        const imgSrc = await imgElement.getAttribute('src');

        if (imgSrc && imgSrc.startsWith('data:image/png;base64,')) {
          const base64Data = imgSrc.replace(/^data:image\/png;base64,/, '');
          fs.writeFileSync(filePath, base64Data, 'base64');
          console.log(`✅ Đã bóc xuất ảnh: ${filePath}`);
        } else {
          console.log(`⚠️ Hóa đơn ${index} không có ảnh base64 hợp lệ.`);
        }

        capturedInvoices.add(index);
      }
    }

    const endMarker = page.getByText('No items left');
    const reachedEnd = await endMarker.isVisible();

    if (reachedEnd) {
      isScrolling = false;
      console.log(`🎉 Hoàn tất! Đã chụp ${capturedInvoices.size} hóa đơn.`);
    } else {
      // Cuộn xuống thêm để load hóa đơn tiếp theo
      await scroller.evaluate((el) => el.scrollBy(0, 400));
      await page.waitForTimeout(500);
    }
  }
}
