// #1: Invoice (Standard) - 14 biến thể
export {
  normalOrder,
  orderWithModifier,
  orderWithDiscountPercentage,
  orderWithDiscountAmount,
  orderWithTip,
  orderWithServiceCharge,
  orderWithMultiplePaymentMethods,
  orderFastCheckout,
  orderTakeAway,
  orderWithCustomerInfo,
  orderWithNote,
  orderWithVoucherPayment,
  orderWithSeatMode,
} from './order';

// #2: Guest Check / Unpaid Bill
export { unpaidBill } from './unpaid-bill';

// #3-4: Order History (Red Bill, Refund)
export { redBill, fullRefund } from './order-history';

// #5: Kitchen Ticket - 7 biến thể
export {
  kitchenMultiPrinterGroups,
  kitchenWithModifiers,
  kitchenWithCourses,
  kitchenCancelItems,
  kitchenReprint,
  kitchenWithCustomerInfo,
  kitchenTakeaway,
} from './kitchen-ticket';

// #7-11, #13: Reports
export {
  printXReport,
  printZReport,
  reprintZReport,
  printStaffReport,
  printMonthlyReport,
  printCashbookReport,
  printStaffShiftsReport,
} from './print-report';

// #12: Voucher
export { createVoucher, printSingleVoucher } from './voucher';

// Invoice management (dùng chung)
export { navigateToInvoiceList, scrollAndCaptureInvoices } from './invoice-management';
