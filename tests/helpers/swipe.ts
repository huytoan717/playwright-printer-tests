import { Locator, Page } from '@playwright/test';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface SwipeOptions {
  /** Khoảng cách vuốt tính bằng pixel (mặc định: 200) */
  distance?: number;
  /** Thời gian vuốt tính bằng ms (mặc định: 300) */
  duration?: number;
  /** Số lần vuốt (mặc định: 1) */
  times?: number;
  /** Thời gian chờ giữa các lần vuốt tính bằng ms (mặc định: 200) */
  delayBetween?: number;
}

/**
 * Giả lập thao tác vuốt (swipe) trên một phần tử.
 *
 * Ví dụ:
 *   await swipe(page.locator('.order-item'), 'left');
 *   await swipe(page.locator('.carousel'), 'right', { distance: 300 });
 *   await swipe(page.locator('.item'), 'left', { times: 3 });
 */
export async function swipe(
  target: Locator | Page,
  direction: SwipeDirection,
  options?: SwipeOptions,
) {
  const distance = options?.distance ?? 200;
  const duration = options?.duration ?? 300;
  const times = options?.times ?? 1;
  const delayBetween = options?.delayBetween ?? 200;
  const steps = Math.max(Math.floor(duration / 16), 5); // ~60fps

  const page = 'page' in target ? (target as Locator).page() : (target as Page);

  const delta = {
    left:  { x: -distance, y: 0 },
    right: { x: distance,  y: 0 },
    up:    { x: 0, y: -distance },
    down:  { x: 0, y: distance },
  }[direction];

  for (let t = 0; t < times; t++) {
    let startX: number;
    let startY: number;

    if ('boundingBox' in target) {
      const box = await (target as Locator).boundingBox();
      if (!box) throw new Error('Không tìm thấy phần tử để vuốt');
      startX = box.x + box.width / 2;
      startY = box.y + box.height / 2;
    } else {
      const viewport = (target as Page).viewportSize();
      if (!viewport) throw new Error('Không xác định được viewport');
      startX = viewport.width / 2;
      startY = viewport.height / 2;
    }

    await page.mouse.move(startX, startY);
    await page.mouse.down();

    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      await page.mouse.move(
        startX + delta.x * progress,
        startY + delta.y * progress,
      );
    }

    await page.mouse.up();

    // Chờ giữa các lần vuốt (trừ lần cuối)
    if (t < times - 1) {
      await page.waitForTimeout(delayBetween);
    }
  }
}
