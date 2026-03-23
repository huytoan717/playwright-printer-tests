import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { getInvoiceImagesDir } from "../helpers/test-output";
import { runInConsole } from "../helpers";

// Di chuyển đến màn hình danh sách hóa đơn
export async function navigateToInvoiceList(page: Page) {
  console.log("🔄 Đang di chuyển đến màn hình danh sách hóa đơn...");

  await runInConsole(
    page,
    `
    router.screen = 'VirtualPrinter';
  `,
  );
  await page.waitForTimeout(2000);
}

// Tự động cuộn và bóc xuất ảnh toàn bộ hóa đơn
export async function scrollAndCaptureInvoices(page: Page, testDir: string) {
  const imagesDir = getInvoiceImagesDir(testDir);
  const v1Dir = path.join(imagesDir, "v1");
  const v2Dir = path.join(imagesDir, "v2");

  console.log(`📸 Bắt đầu quét, cuộn và chụp → ${imagesDir}`);

  const scroller = page.getByTestId("virtuoso-scroller");
  await scroller.waitFor({ state: "visible" });

  const capturedInvoices = new Set<string>();
  let isScrolling = true;

  while (isScrolling) {
    const visibleInvoices = page.locator("div[data-index]");
    const count = await visibleInvoices.count();

    for (let i = 0; i < count; i++) {
      const invoice = visibleInvoices.nth(i);
      // Virtual list có thể báo count lớn hơn số phần tử thực sự render
      const index = await invoice.getAttribute("data-index", { timeout: 2000 }).catch(() => null);

      if (index !== null && !capturedInvoices.has(index)) {
        await invoice.scrollIntoViewIfNeeded();

        // Kiểm tra tag V1 hay V2 để gom đúng thư mục
        const v2Label = invoice.getByText("V2", { exact: true });
        const isV2 = await v2Label.isVisible();
        const targetDir = isV2 ? v2Dir : v1Dir;

        // Mở popup View Details
        await invoice.getByText("View Details").click();

        const popup = page
          .locator(".bg-white-solid-white-100-ffffff")
          .filter({
            has: page.locator('img[src*="close-popup"]'),
          })
          .first();
        const orderIdContainer = popup.locator("div.pr-12");
        await orderIdContainer.waitFor({ state: "visible" });

        // Bóc tách Order ID làm tên file
        const fullText = (await orderIdContainer.textContent()) || "";
        const match = fullText.match(/Order id:\s*([a-zA-Z0-9]+)/);
        const orderId = match ? match[1] : `no-id-${index}`;
        // Tránh ghi đè khi cùng orderId xuất hiện nhiều lần
        let filePath = path.join(targetDir, `order-${orderId}.png`);
        let counter = 1;
        while (fs.existsSync(filePath)) {
          filePath = path.join(targetDir, `order-${orderId}-${counter}.png`);
          counter++;
        }

        // Lấy ảnh và lưu file
        const imgElement = popup.locator("img.object-cover").first();
        const imgSrc = await imgElement.getAttribute("src");

        if (imgSrc && imgSrc.startsWith("data:image/png;base64,")) {
          const base64Data = imgSrc.replace(/^data:image\/png;base64,/, "");
          fs.writeFileSync(filePath, base64Data, "base64");
          console.log(`✅ Đã lưu hóa đơn: ${filePath}`);
        } else {
          console.log(`⚠️ Hóa đơn ${orderId} không có ảnh base64 hợp lệ.`);
        }

        // Đóng popup
        await popup.locator('img[src*="close-popup"]').click();
        await popup.waitFor({ state: "hidden" });

        capturedInvoices.add(index);
      }
    }

    const endMarker = page.getByText("No items left");
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
