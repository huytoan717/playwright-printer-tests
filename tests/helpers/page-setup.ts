import { Page } from '@playwright/test';

export interface PageSetupOptions {
  url: string;
}

const DEFAULT_URL = 'http://localhost:6006/iframe.html?args=&id=pixi--full-app-3&viewMode=story';

/**
 * Mở trang web, chờ các param tồn tại trên window, rồi gán giá trị.
 *
 * Ví dụ:
 *   await setupPage(page, {
 *     'posSetting0().printerGeneralSetting.useNewPrintSystem': 'compare',
 *   });
 *   // → chờ window.posSetting0().printerGeneralSetting tồn tại (phần cha)
 *   // → gán .useNewPrintSystem = 'compare'
 */
export async function setupPage(
  page: Page,
  params: Record<string, unknown> = {},
  options?: Partial<PageSetupOptions>,
) {
  const url = options?.url ?? DEFAULT_URL;

  // 1. Mở trang web
  await page.goto(url);

  // 2. Chờ từng param path tồn tại trên window, rồi gán giá trị
  const entries = Object.entries(params);
  if (entries.length > 0) {
    console.log('⏳ Đang chờ các tham số sẵn sàng trên window...');

    for (const [paramPath, value] of entries) {
      // Tách path thành các phần
      const parts = paramPath.match(/[^.]+/g)!;
      // Phần cha = tất cả trừ phần cuối (phần cuối là property cần gán)
      const parentParts = parts.slice(0, -1);

      // Chờ cho đến khi phần cha tồn tại trên window
      if (parentParts.length > 0) {
        await page.waitForFunction((parentPath: string[]) => {
          let current: any = window;
          for (const part of parentPath) {
            const isCall = part.endsWith('()');
            const key = isCall ? part.slice(0, -2) : part;

            try {
              if (current[key] === undefined) return false;
              current = isCall ? current[key]() : current[key];
              if (current === undefined || current === null) return false;
            } catch {
              return false;
            }
          }
          return true;
        }, parentParts);
      }

      // Gán giá trị vào property cuối
      await page.evaluate(({ allParts, val }) => {
        let current: any = window;

        // Duyệt đến phần tử cha
        for (let i = 0; i < allParts.length - 1; i++) {
          const part = allParts[i];
          const isCall = part.endsWith('()');
          const key = isCall ? part.slice(0, -2) : part;
          current = isCall ? current[key]() : current[key];
        }

        // Gán giá trị
        const lastPart = allParts[allParts.length - 1];
        const key = lastPart.endsWith('()') ? lastPart.slice(0, -2) : lastPart;
        current[key] = val;
        console.log(`🎬 Đã gán window.${allParts.join('.')} = ${JSON.stringify(val)}`);
      }, { allParts: parts, val: value });
    }

    console.log('✅ Đã gán xong tất cả tham số!');
  }
}
