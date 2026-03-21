import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { getLogsDir } from './test-output';

export interface LogCaptureConfig {
  fileName: string;
  filterKeyword: string;
}

/** Danh sách log capture mặc định. Thêm keyword mới ở đây. */
export const DEFAULT_LOG_CAPTURES: LogCaptureConfig[] = [
  { fileName: 'print-compare.txt', filterKeyword: '[print:compare]' },
  { fileName: 'print-render-compare.txt', filterKeyword: '[print:render-compare]' },
];

/**
 * Lắng nghe console của trang web và ghi lại log khớp với keyword.
 * Log được lưu vào: test-output/{ten-test}/logs/
 */
export function setupLogCapture(
  page: Page,
  testDir: string,
  captures: LogCaptureConfig[] = DEFAULT_LOG_CAPTURES,
) {
  const logsDir = getLogsDir(testDir);

  // Tạo file mới cho từng capture
  for (const { fileName } of captures) {
    const filePath = path.join(logsDir, fileName);
    fs.writeFileSync(filePath, `--- BẮT ĐẦU TEST LÚC ${new Date().toLocaleTimeString()} ---\n`);
  }

  // Đăng ký 1 listener duy nhất, kiểm tra tất cả keyword
  page.on('console', msg => {
    const logText = msg.text();

    for (const { fileName, filterKeyword } of captures) {
      if (logText.includes(filterKeyword)) {
        const filePath = path.join(logsDir, fileName);
        const time = new Date().toLocaleTimeString();
        fs.appendFileSync(filePath, `[${time}] ${logText}\n`);
        console.log(`✅ Đã bắt được log: ${logText}`);
      }
    }
  });
}
