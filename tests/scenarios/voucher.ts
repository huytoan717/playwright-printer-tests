import { Page } from "@playwright/test";
import { runInConsole } from "../helpers/run-in-console";

// Tạo voucher qua console
export async function createVoucher(page: Page) {
  await runInConsole(page, `
    const nowUnix = Math.floor(Date.now() / 1000);
    const oneYearLaterUnix = nowUnix + 365 * 24 * 60 * 60;

    await window.Voucher.insert({
      _id: crypto.randomUUID(),
      code: '12345678',
      createdAt: nowUnix,
      price: 50000,
      createdBy: 'admin',
      status: 'created',
      activated: true,
      expiredAt: oneYearLaterUnix,
      name: 'Voucher',
      type: 'amount',
      totalValue: 10,
      usedValue: 0,
      customerLastName: 'Nguyen',
      customerFirstName: 'Van A',
      isEqualPrice: true,
    });

    console.log('✅ Đã tạo voucher thành công!');
  `);
}

// #12b: In voucher đơn lẻ từ màn hình quản lý voucher
export async function printSingleVoucher(page: Page) {
  // TODO: Vào Voucher Management → chọn voucher → Print
}
