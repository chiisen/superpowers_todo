# 自動化驗收測試（Playwright）

以真實 headless Chromium（Playwright 1.62.1）執行端對端驗收，避免手動點擊遺漏，並驗證 `localStorage` 持久化。

## 前置安裝

本專案以 `package.json` 管理測試依賴，只需：

```bash
bun install
bunx playwright install chromium
```

> 說明：`node_modules/` 已在 `.gitignore` 忽略，不會進入版控。

## 執行

```bash
bun test
# 或
bun tests/acceptance.mjs
```

腳本位於 `tests/acceptance.mjs`，會以 `http://` 提供專案（避免 `file://` 下 `localStorage` 限制），並跑完 5 項斷言：新增 / Enter 新增 / 勾選 / 刪除 / 重整後 localStorage 保留，且無 JS 控制台錯誤。

完整逐項斷言版曾於 2026-08-26 實際執行，對應紀錄見 [Issue #1](https://github.com/chiisen/superpowers_todo/issues/1)。

## 驗收結果（2026-08-26）

| # | 檢查項目 | 結果 |
|---|---------|------|
| 1 | 點「新增」→ 項目出現 | ✅ |
| 2 | 按 Enter → 項目出現 | ✅ |
| 3 | 勾選 → completed 樣式 | ✅ |
| 4 | 刪除 → 項目消失 | ✅ |
| 5 | 重新載入 → 資料保留 | ✅ |

無 JS 控制台錯誤。
