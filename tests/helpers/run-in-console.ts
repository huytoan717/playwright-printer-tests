import { Page } from '@playwright/test';

/**
 * Chạy đoạn code JavaScript trong console của trang web.
 * Hỗ trợ await, import module trực tiếp.
 *
 * Ví dụ:
 *   await runInConsole(page, `
 *     const { Voucher } = await import("@/data/Voucher");
 *     await Voucher.insert({ _id: '123', code: '12345678' });
 *   `);
 */
export async function runInConsole(page: Page, code: string) {
  console.log('🚀 Đang chạy code trong console của trang web...');

  const result = await page.evaluate(async (script) => {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const fn = new AsyncFunction(script);
    return await fn();
  }, code);

  console.log('✅ Đã chạy xong code trong console!');
  return result;
}
