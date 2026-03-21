import { Page } from '@playwright/test';
import { runInConsole } from '../helpers/run-in-console';

// Tạo voucher bằng cách chạy Voucher.insert trực tiếp trong console của trang web
export async function createVoucher(page: Page) {
  await runInConsole(page, `
    const uuid = (await import("time-uuid")).default;
    const dayjs = (await import("dayjs")).default;
    const { Voucher } = await import("@/data/Voucher");

    await Voucher.insert({
      _id: uuid(),
      code: '12345678',
      createdAt: dayjs().unix(),
      price: 50000,
      createdBy: 'admin',
      status: 'created',
      activated: true,
      expiredAt: dayjs().add(1, 'year').unix(),
      name: 'Voucher',
      type: 'amount',
      totalValue: 100000,
      usedValue: 0,
      customerLastName: 'Nguyen',
      customerFirstName: 'Van A',
      isEqualPrice: true,
    });

    console.log('✅ Đã tạo voucher thành công!');
  `);
}
