# Print System Test Checklist

Testing guide for verifying the new print system produces identical output to the old one using compare mode.

## Setup

1. Open the app in browser
2. Open browser console (`Cmd+Option+J`)
3. Enable compare mode:
   ```js
   // In console — update the setting
   const db = window.database
   const settings = await db.posSettings.find().exec()
   const doc = settings[0]
   await doc.incrementalPatch({ 'printerGeneralSetting.useNewPrintSystem': 'compare' })
   ```
4. Reload the page

## How Compare Mode Works

- Old flow runs first, prints normally (safe)
- New formatter runs after old flow completes (so order mutations like TSE qrCode are available)
- Both scripts saved to PrintScripts collection (old: no `_compareSource`, new: `_compareSource: 'new'`)
- Scripts matched by `orderId` + `type` metadata (prevents cross-type mismatches)
- Console shows `✅ MATCH` or `❌ MISMATCH` with diff details
- After testing, run `__printCompareReport()` in console for summary

---

## Routing Status

### Routed (has `useNewPrintSystem0()` + `isCompareMode()`)

| Flow | Entry Point | File |
|------|------------|------|
| Invoice (standard payment) | `printInvoice_new()` | `payment-view-context.ts` (2 locations: seat + single) |
| Invoice (order history) | `printInvoice()` | `print-invoice.ts` |
| Invoice (cancel/refund) | `handlePrintCancelRefundOrder()` | `order-history.service.ts` |
| SRM Invoice (print-invoice) | `printInvoice()` | `print-invoice.ts` (closing receipt via new system) |
| SRM Invoice (payment-view group) | `recordClosingReceipt()` | `payment-view-context.ts` (group bill) |
| SRM Invoice (payment-view seat) | `recordClosingReceipt()` | `payment-view-context.ts` (seat payment) |
| SRM Invoice (payment-view single) | `recordClosingReceipt()` | `payment-view-context.ts` (fast checkout) |
| SRM Invoice (payment-handler group) | `recordClosingReceipt()` | `payment-handler.ts` (group bill + cardInfo) |
| SRM Invoice (payment-handler seat) | `recordClosingReceipt()` | `payment-handler.ts` (seat + cardInfo) |
| SRM Invoice (payment-handler single) | `recordClosingReceipt()` | `payment-handler.ts` (fast checkout + cardInfo) |
| SRM Invoice (online order) | `recordClosingReceipt()` | `online-order.service.ts` |
| SRM Invoice (delivery) | `recordClosingReceipt()` | `new-delivery-view-context.ts` |
| Kitchen (order handler) | `onKitchenPrint()` | `order-handler.ts` (2 locations) |
| Label (order handler) | `handlePrintLabel()` | `order-handler.ts` |
| X Report | `onPrintX()` | `eod.service.ts` |
| Z Report | `onPrintZ()` | `eod.service.ts` |
| Z Report Reprint | `onReprintZ()` | `eod.service.ts` |
| Staff Report | `onPrintStaffReport()` | `staff-report.service.ts` |
| Monthly Report | `onPrintMonthlyReport()` | `monthly-report.service.ts` |

### Now Routed (previously unrouted, now wired with flag check)

| Flow | File | Formatter |
|------|------|-----------|
| Online order invoice | `online-order.service.ts` | `invoice` |
| Online order kitchen + label | `online-order.service.ts` | `kitchen`, `label` |
| Online order guest check | `online-order.service.ts` | `guest-check` |
| Payment handler (seat invoice) | `payment-handler.ts` | `invoice` |
| Payment handler (single invoice) | `payment-handler.ts` | `invoice` |
| Payment handler kitchen + label | `payment-handler.ts` | `kitchen`, `label` |
| Payment handler voucher | `payment-handler.ts` | `voucher` |
| Payment view kitchen + label | `payment-view-context.ts` | `kitchen`, `label` |
| Delivery invoice | `new-delivery-view-context.ts` | `invoice` |
| Delivery kitchen + label | `new-delivery-view-context.ts` | `kitchen`, `label` |
| Kitchen reprint (order view) | `library/.../OrderBurgerMenuButton.tsx` | `kitchen` | compare: yes |
| Kitchen reprint (pending order) | `library/.../PopupOrderDetailsPlugin.tsx` | `kitchen` | compare: yes |
| Voucher (single) | `print-voucher.ts` | `voucher` | compare: yes |
| Cashbook | `cashbook.service.ts` | `cashbook` | compare: yes |
| QR code table print | `PrintTableQRCode.ts` | `table-qr-code` | compare: n/a (utility) |
| SRM user report | `srm-report.service.ts` | `srm-user-report` | compare: yes |
| Test printer (all types) | `IsClientRecheckBar.tsx` | `test-print` | compare: n/a (test-only) |
| Order history reprint | `order-history.service.ts` | Routes via `printInvoice()` | compare: yes (via printInvoice) |
| SRM reprint (order history) | `order-history.service.ts` | `srm-invoice` via `reproduceBill({print: false})` | compare: yes |
| SRM duplicate bill | `TransactionsTable.tsx` | `srm-invoice` via `printDuplicate({print: false})` | compare: yes |
| Staff shifts report | `PrintShiftPopup.tsx` | `staff-shifts` | compare: yes |

### NOT Routed (still bypasses feature flag)

None — all print flows are now routed through `useNewPrintSystem0()`.

### Pending Formatters

None — all formatters have been created.

---

## Test Flows

### 1. Invoice (Standard)

**Entry point:** `payment-view-context.ts` → `printInvoice_new()`

**Steps:**
- [ ] Create order on a table → add 2+ items → Pay with Cash → Complete
- [ ] Check console for `✅ [invoice] MATCH` or `❌ [invoice] MISMATCH`

**Variations to test:**
- [ ] Order with modifiers
- [ ] Order with discount (percentage)
- [ ] Order with discount (fixed amount)
- [ ] Order with tip
- [ ] Order with service fee
- [ ] Order with multiple payment methods (split payment)
- [ ] Fast checkout (no table)
- [ ] Takeaway order
- [ ] Order with customer info (name, phone, address)
- [ ] Order with note
- [ ] Order with voucher payment
- [ ] Order with seat mode (per-seat invoice)

### 2. Invoice (Guest Check / Unpaid Bill)

**Entry point:** `print-invoice.ts` → `printInvoice(order, GUEST_CHECK)`

**Steps:**
- [ ] Create order on a table → add items → Click "Unpaid Bill" button
- [ ] Check console for `✅ [guest-check] MATCH`

### 3. Invoice (Red Invoice / Cancellation)

**Entry point:** `print-invoice.ts` → `printInvoice(order, RED_INVOICE)`

**Steps:**
- [ ] Go to Order History → find a paid order → Cancel/Refund → Print
- [ ] Check console for `✅ [red-invoice] MATCH`

### 4. Invoice (Cancel/Refund from Order History)

**Entry point:** `order-history.service.ts` → `handlePrintCancelRefundOrder()`

**Steps:**
- [ ] Go to Order History → select a paid order → Refund (amount or items) → Complete
- [ ] Check console for `✅ [invoice] MATCH`

### 5. Kitchen Ticket

**Entry point:** `order-handler.ts` → `onKitchenPrint()`

**Steps:**
- [ ] Create order on a table → add 2+ items from different kitchen groups → Click Print
- [ ] Check console for `✅ [kitchen] MATCH` (one per kitchen printer group)

**Variations to test:**
- [ ] Items going to different kitchen printers
- [ ] Items with modifiers
- [ ] Items with different courses
- [ ] Cancel items (add items, print, then remove items and print again)
- [ ] Reprint kitchen ticket
- [ ] Order with customer info (delivery)
- [ ] Takeaway order

### 6. Label / Ticket

**Entry point:** `order-handler.ts` → `handlePrintLabel()`

**Note:** Label compare is not yet wired (label formatter expects pre-formatted input). Test manually by switching to `useNewPrintSystem: true` and comparing the physical label output.

- [ ] Create order with items that have label printers assigned → Print
- [ ] Compare physical label output between old and new flow

### 7. X Report

**Entry point:** `eod.service.ts` → `onPrintX()`

**Steps:**
- [ ] Complete a few orders first (to have data)
- [ ] Go to End of Day → Click "X Report"
- [ ] Check console for `✅ [x-report] MATCH`

### 8. Z Report (End of Day)

**Entry point:** `eod.service.ts` → `onPrintZ()`

**Steps:**
- [ ] Complete a few orders first
- [ ] Go to End of Day → Click "Close Z" / Complete Sale
- [ ] Check console for `✅ [z-report] MATCH`

**Note:** This creates an EOD record — only do this when you actually want to close the day.

### 9. Z Report Reprint

**Entry point:** `eod.service.ts` → `onReprintZ()`

**Steps:**
- [ ] After closing a Z report → Click "Reprint"
- [ ] Check console for `✅ [z-report-reprint] MATCH`

### 10. Staff Report

**Entry point:** `staff-report.service.ts` → `onPrintStaffReport()`

**Steps:**
- [ ] Go to Staff Report → Select a staff member → Click Print
- [ ] Check console for `✅ [staff-report] MATCH`

### 11. Monthly Report

**Entry point:** `monthly-report.service.ts` → `onPrintMonthlyReport()`

**Steps:**
- [ ] Go to Monthly Report → Click Print
- [ ] Check console for `✅ [monthly-report] MATCH`

### 12. Voucher

**Entry point:** `print-voucher.ts` → `printSingleVoucher()`, `payment-handler.ts` → `updateVouchersPostPay()`

**Steps:**
- [ ] Create order with voucher item → Pay → Complete
- [ ] Verify voucher prints correctly
- [ ] Test single voucher print from voucher management

### 13. Cashbook Report

**Entry point:** `cashbook.service.ts` → `closeDay()`

**Steps:**
- [ ] Add cashbook transactions (incoming + outgoing)
- [ ] Go to Cashbook → Close Day
- [ ] Verify cashbook report prints with correct balances and transaction tables
- [ ] With `useNewPrintSystem: true` → routes through `cashbook` formatter

### 14. QR Code Table Printing

**Entry point:** `PrintTableQRCode.ts` → `printTablesQRCodes()`

**Steps:**
- [ ] Go to QR Order settings → Select tables → Print QR codes
- [ ] Verify each table gets its own QR code with table name header
- [ ] With `useNewPrintSystem: true` → routes through `table-qr-code` formatter

### 15. SRM User Report (Quebec only)

**Entry point:** `srm-report.service.ts` → `printReportDocument()`

**Steps:**
- [ ] Enable Quebec SRM → Generate user report
- [ ] Verify report prints with company info, transaction details, device info, dates, QR code
- [ ] With `useNewPrintSystem: true` → routes through `srm-user-report` formatter

### 16. Test Printer (Printer Settings)

**Entry point:** `library/printer-setting/.../IsClientRecheckBar.tsx`

**Steps:**
- [ ] Go to Printer Settings → Select each printer type → Click "Test Printer"
- [ ] With `useNewPrintSystem: true` → all types route through `test-print` formatter with `forceLocal` (bypasses master delegation)
- [ ] Test: IP, Star, Bluetooth, BT Epson, USB, WinDrive, Integrate, Serial, Clover

### 17. Kitchen Reprint (library components)

**Entry points:** `library/order-view-v2/.../OrderBurgerMenuButton.tsx`, `library/pending-order/.../PopupOrderDetailsPlugin.tsx`

**Steps:**
- [ ] Open order burger menu → Click reprint kitchen
- [ ] Open pending order details → Click reprint
- [ ] With `useNewPrintSystem: true` → routes through `kitchen` formatter

---

## Country-Specific Tests

### Germany (country = 'de')

- [ ] Invoice with customer info at bottom (Germany shows customer info in payment section)
- [ ] Invoice with `isBoldCustomerInformation` enabled
- [ ] Invoice with TSE QR code (requires TseLocalMock — see TSE setup below)
- [ ] Invoice with company address + zip code + email on header
- [ ] Z Report with tax components display

### Canada (country = 'ca')

- [ ] Invoice without bag fee line (hidden when no bag fee)
- [ ] Invoice without cashback line (hidden when no cashback)

---

## TSE (Germany Tax) Setup

1. Go to Settings → Developer → TSE tab
2. Select `TseLocalMock`
3. Activate

**Then test:**
- [ ] Invoice with TSE QR code → check `✅ [invoice] MATCH`
- [ ] Invoice with TSE failed (no QR code generated — new formatter skips this, see Known Limitations)

---

## SRM (Quebec) Setup

1. Go to Settings → Developer → Quebec SRM tab
2. Click Windows icon (device preset)
3. Switch all toggles ON
4. Click "Assign" to assign new certificate
5. Wait for server response

**Then test (with `useNewPrintSystem: true`):**
- [ ] Closing receipt (standard payment) → verify SRM transaction recorded + prints via new system
- [ ] Group bill → verify all seats recorded + printed
- [ ] Seat payment (split bill) → verify per-seat SRM receipt
- [ ] Fast checkout (no table) → verify SRM receipt
- [ ] Online order (SRM enabled) → verify SRM receipt
- [ ] Delivery order (SRM enabled) → verify SRM receipt
- [ ] Payment with card info → verify card details on receipt
- [ ] QR code prints correctly on receipt
- [ ] Guest check via SRM flow → verify temporary bill prints

**Then test (with `useNewPrintSystem: false`):**
- [ ] All above flows still work via old VPrinter path (unchanged)

**Then test (with `useNewPrintSystem: 'compare'`):**
- [ ] Go to Order History → pay an order → check console for `✅ [srm-invoice] MATCH` or `❌ [srm-invoice] MISMATCH`
- [ ] Compare mode runs old SRM flow (prints via VPrinter), then runs new SrmInvoiceFormatter and compares scripts
- [ ] Entry point: `print-invoice.ts` → `printInvoice()` with `InvoiceTypes.INVOICE`
- [ ] Run `__printCompareReport()` in console for summary

**Note:** SRM compare is wired in `print-invoice.ts` via `runCompareSrm()`. The old flow runs `recordClosingReceipt(order, { print: true })` which returns scripts from `srmPrintingService.printTransaction()`. The new formatter is then run via `formatOnly('srm-invoice', ...)` and both script arrays are compared. SRM is now fully routed through the new print system when `useNewPrintSystem` is enabled. `SrmInvoiceFormatter` is self-contained — it ports all 15 print methods from `srmPrintingService` directly, with zero dependency on the old printing service. All 9 caller locations (print-invoice, payment-view-context x3, payment-handler x3, online-order, delivery) branch on the feature flag.

### 18. SRM Reprint (Order History)

**Entry point:** `order-history.service.ts` → `handleRePrintOrder()`

**Steps:**
- [ ] Enable Quebec SRM → Create and pay an order
- [ ] Go to Order History → Select the paid order → Click "Reprint"
- [ ] With `useNewPrintSystem: true` → uses `reproduceBill({print: false})` then `getPrintSystem().print('srm-invoice')`
- [ ] With `useNewPrintSystem: 'compare'` → old flow prints via `reproduceBill()`, compare runs `runCompareSrm()`

### 19. SRM Duplicate Bill (Admin Transactions Table)

**Entry point:** `TransactionsTable.tsx` → print duplicate button

**Steps:**
- [ ] Enable Quebec SRM → Create and pay an order
- [ ] Go to Settings → SRM → Transactions tab → Click print icon on a transaction row
- [ ] With `useNewPrintSystem: true` → uses `printDuplicate({print: false})` then `getPrintSystem().print('srm-invoice')`
- [ ] With `useNewPrintSystem: 'compare'` → old flow prints via `printDuplicate()`, compare runs `runCompareSrm()`

### 20. Staff Shifts Report

**Entry point:** `library/.../PrintShiftPopup.tsx` → `onConfirm()`

**Steps:**
- [ ] Go to Staff Report → Click "Print Shift" → Select date range → Confirm
- [ ] With `useNewPrintSystem: false` → prints via `printStaffShifts()` + `printInvoiceFromRaster()`
- [ ] With `useNewPrintSystem: 'compare'` → old flow prints, compare runs `runCompareForReport('staff-shifts', ...)`
- [ ] With `useNewPrintSystem: true` → routes through `staff-shifts` formatter

---

## Online Order Tests

- [ ] Online order (Deliverect provider) with delivery
- [ ] Online order with pickup
- [ ] Online order with external ID
- [ ] Online order with shipping fee
- [ ] Online order with bag fee
- [ ] Uber Eats order (external ID truncated to last 6 chars)

**Note:** Online order printing (`online-order.service.ts`) is now fully routed via the feature flag (kitchen, label, guest-check, and invoice).

---

## Printer Setting Variations

Test with different printer settings enabled:

- [ ] `merge` ON (shows "2x Burger" instead of table columns)
- [ ] `hideUnitPrice` ON
- [ ] `boldItems` ON
- [ ] `spaceBetweenItems` ON
- [ ] `printLogoToInvoice` ON (with logo uploaded)
- [ ] `printCustomerInfo` ON
- [ ] `printTipLine` ON
- [ ] `printOrderId` ON
- [ ] `printAddressAndZip` ON
- [ ] `isBoldCustomerInformation` ON (Germany)
- [ ] Custom `fontSize` (not default)
- [ ] Custom `fontSizeForReceiptHeader`
- [ ] Custom `marginTop`
- [ ] `hideTseQrCodeInInvoice` ON
- [ ] `showDistanceQR` ON (with delivery order)

---

## Reading Results

### In Console

```js
// Summary table
__printCompareReport()

// All results
__printCompareResults

// Only failures
__printCompareResults.filter(r => !r.match)

// Failures with diffs
__printCompareResults.filter(r => !r.match).forEach(r => {
  console.log(r.type, r.diffs)
})
```

### In Virtual Printer

Both old and new flow scripts are saved to PrintScripts collection:
- Old flow: has `type` in metadata (e.g., `'invoice'`, `'kitchen'`), no `_compareSource` field
- New flow: has `_compareSource: 'new'` in metadata

You can view both in the Virtual Printer screen and visually compare.

---

## Known Limitations

1. **TSE "ausgefallen"** — the new formatter does NOT print "TSE ausgefallen" (TSE failed). This is a call-site concern handled by PrintStack.ts after waiting for `qrCodeLock`. The formatter only prints TSE info when `order.qrCode` exists. In compare mode, the new formatter runs after the old flow so `qrCode` should be available.

2. **Adyen payment info** — new formatter skips Adyen transaction details (requires DB query). Will show as mismatch for Adyen payments.

3. **Voucher remaining balance** — new formatter skips remaining balance line (requires `vouchers0()` signal). Will show as mismatch for orders with voucher payments.

4. **`findCustomerByCompanyName`** — new formatter skips `Kundennummer` line for Germany (requires customer state lookup).

5. **Kitchen ticket** — compare uses `getReceiptsFromOrder()` to build groups. If the grouping logic differs from the old flow's `printKitchen()`, results may differ.

6. **Label ticket** — compare not yet wired (label formatter expects different input format).

7. **Staff shifts report** — `staff-shifts` formatter is now created and fully routed. Compare mode is wired with render comparison.

---

## After All Tests Pass

1. Change setting to `useNewPrintSystem: true`
3. Test each flow again — verify actual printing works
4. Test master/client printing (print from client device, verify master receives and prints)
5. Test recheck printers (verify copies are printed)
6. Test cash drawer opens correctly
7. Test virtual printer history shows new prints
8. Test printer settings page — all "Test Printer" buttons route through new system
9. Test cashbook close → verify cashbook report prints
10. Test QR code table printing from QR order view
11. Test SRM user report printing (Quebec only)
