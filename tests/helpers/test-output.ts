import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_ROOT = 'test-output';

/** Chuyển tên test thành tên thư mục an toàn (bỏ dấu, thay khoảng trắng). */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Tạo thư mục output cho test, trả về đường dẫn gốc.
 *
 * Cấu trúc:
 *   test-output/{ten-test}/
 *     logs/
 *     invoice-images/v1/
 *     invoice-images/v2/
 */
export function createTestOutputDir(testTitle: string): string {
  const testSlug = slugify(testTitle);
  const testDir = path.join(OUTPUT_ROOT, testSlug);

  const dirs = [
    path.join(testDir, 'logs'),
    path.join(testDir, 'invoice-images', 'v1'),
    path.join(testDir, 'invoice-images', 'v2'),
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  return testDir;
}

/** Trả về đường dẫn thư mục logs của test */
export function getLogsDir(testDir: string): string {
  return path.join(testDir, 'logs');
}

/** Trả về đường dẫn thư mục ảnh hóa đơn của test */
export function getInvoiceImagesDir(testDir: string): string {
  return path.join(testDir, 'invoice-images');
}
