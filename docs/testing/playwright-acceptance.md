# 自動化驗收測試（Playwright）

以真實 headless Chromium（Playwright 1.62.1）執行端對端驗收，避免手動點擊遺漏，並驗證 `localStorage` 持久化。

## 前置安裝

需在專案外或專案內安裝 Playwright（本測試直接使用 `bun` 執行腳本）：

```bash
bun add playwright
bunx playwright install chromium
```

> 說明：為避免污染靜態專案，可於臨時目錄（如 `/tmp/browse-qa`）安裝，再從該目錄執行腳本並指向本專案路徑。

## 執行腳本

在可讀取本專案的目錄建立 `qa.ts`，以 `http://` 提供頁面（避免 `file://` 下 `localStorage` 限制），再用腳本模擬 5 項操作：

```ts
import { chromium } from 'playwright';

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const p = new URL(req.url).pathname === '/' ? '/index.html' : new URL(req.url).pathname;
    const file = Bun.file('.' + p);
    return (await file.exists()) ? new Response(file) : new Response('404', { status: 404 });
  },
});
const base = `http://localhost:${server.port}/index.html`;

const browser = await chromium.launch();
const page = await browser.newPage();
const errors: string[] = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(base);
await page.waitForSelector('#todo-list', { state: 'attached' });
await page.evaluate(() => localStorage.removeItem('todos'));
await page.reload();
await page.waitForSelector('#todo-list', { state: 'attached' });

await page.fill('#todo-input', '買牛奶'); await page.click('#add-btn');
await page.fill('#todo-input', '寫程式'); await page.press('#todo-input', 'Enter');
await page.locator('#todo-list li').first().locator('input[type=checkbox]').check();
const before = await page.locator('#todo-list li').count();
await page.locator('#todo-list li').first().locator('button.delete-btn').click();
await page.reload();
await page.waitForSelector('#todo-list', { state: 'attached' });

const final = await page.locator('#todo-list li').count();
const ls = await page.evaluate(() => localStorage.getItem('todos'));
console.log('剩餘項目 =', final, '| localStorage =', ls, '| 錯誤 =', errors);

await browser.close();
server.stop();
```

完整逐項斷言版（含 5 項明確斷言與通過/失敗輸出）曾於 2026-08-26 實際執行，對應紀錄見 [Issue #1](https://github.com/chiisen/superpowers_todo/issues/1)。

## 驗收結果（2026-08-26）

| # | 檢查項目 | 結果 |
|---|---------|------|
| 1 | 點「新增」→ 項目出現 | ✅ |
| 2 | 按 Enter → 項目出現 | ✅ |
| 3 | 勾選 → completed 樣式 | ✅ |
| 4 | 刪除 → 項目消失 | ✅ |
| 5 | 重新載入 → 資料保留 | ✅ |

無 JS 控制台錯誤。
