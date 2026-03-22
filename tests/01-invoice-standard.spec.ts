import { test } from "./helpers/compare-fixture";
import { runInConsole } from "./helpers/run-in-console";
import {
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
} from "./scenarios/order";
import { createVoucher } from "./scenarios/voucher";
import { navigateToInvoiceList, scrollAndCaptureInvoices } from "./scenarios/invoice-management";

/**
 * #1: Invoice (Standard)
 * Entry point: payment-view-context.ts → printInvoice_new()
 * Console log: ✅ [invoice] MATCH
 */
test.describe("1. Invoice Standard", () => {
  test.setTimeout(300_000);

  test("Normal order", async ({ page, testDir }) => {
    await normalOrder(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with modifiers", async ({ page, testDir }) => {
    await orderWithModifier(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with discount (percentage)", async ({ page, testDir }) => {
    await orderWithDiscountPercentage(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with discount (fixed amount)", async ({ page, testDir }) => {
    await orderWithDiscountAmount(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with tip", async ({ page, testDir }) => {
    await orderWithTip(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with service fee", async ({ page, testDir }) => {
    await orderWithServiceCharge(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with multiple payment methods", async ({ page, testDir }) => {
    await orderWithMultiplePaymentMethods(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Fast checkout (no table)", async ({ page, testDir }) => {
    await orderFastCheckout(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Takeaway order", async ({ page, testDir }) => {
    await orderTakeAway(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with customer info", async ({ page, testDir }) => {
    await orderWithCustomerInfo(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with note", async ({ page, testDir }) => {
    await orderWithNote(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with voucher payment", async ({ page, testDir }) => {
    await createVoucher(page);
    await orderWithVoucherPayment(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("Order with seat mode", async ({ page, testDir }) => {
    await orderWithSeatMode(page);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });

  test("All variations - full run", async ({ page, testDir }) => {
    await createVoucher(page);
    await normalOrder(page);
    await orderWithModifier(page);
    await orderWithDiscountPercentage(page);
    await orderWithDiscountAmount(page);
    await orderWithTip(page);
    await orderWithServiceCharge(page);
    await orderWithMultiplePaymentMethods(page);
    await orderFastCheckout(page);
    await orderTakeAway(page);
    await orderWithCustomerInfo(page);
    await orderWithNote(page);
    await orderWithVoucherPayment(page);
    await orderWithSeatMode(page);
    await runInConsole(page, `__printCompareReport()`);
    await navigateToInvoiceList(page);
    await scrollAndCaptureInvoices(page, testDir);
  });
});
