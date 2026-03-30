# superpowers_todo

利用 Superpowers 製作一個 Todo List，驗證 superpowers 開發流程。

---

## Superpowers Brainstorming 流程記錄

### 流程概覽

| 步驟 | 狀態 | Superpowers 規範 |
|------|------|------------------|
| 1. 探索專案背景 | ✅ 完成 | `Checklist #1`: 先檢查檔案、文件、最近提交 |
| 2. 問澄清問題 | ✅ 完成 | `Checklist #3`: 一個問題一次，了解目的/限制/成功標準 |
| 3. 提出 2-3 方案 | ✅ 完成 | `Checklist #4`: 必須提出多個方案 + trade-offs + 建議 |
| 4. 分段呈現設計 | ✅ 完成 | `Checklist #5`: 分段呈現，每段逐一批准 |
| 5. 寫設計文件 | ✅ 完成 | `Checklist #6`: 存到 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| 6. Spec 自我審查 | ✅ 完成 | `Checklist #7`: 檢查 placeholder/矛盾/模糊/範圍 |
| 7. 用戶審查 spec | ⏳ 待批准 | `User Review Gate`: 等待用戶批准才能進入實作 |
| 8. 調用 writing-plans | 🔒 等待 | `Checklist #9`: 批准後才能調用 writing-plans skill |

---

### 各步驟詳情與 Superpowers 規範對應

#### 步驟 1: 探索專案背景

**執行內容**:
- `ls -la` 檢查檔案結構 → 發現空專案 (只有 LICENSE + README.md)
- `git log --oneline -5` 檢查提交 → 只有 Initial commit

**Superpowers 規範** (`brainstorming/SKILL.md`):
> "Start by understanding the current project context... Check out the current project state first (files, docs, recent commits)"

**目的**: 避免「閉門造車」，先了解現況再提問。

---

#### 步驟 2: 問澄清問題

**執行內容** (一次一個問題):

| 問題 | 用戶回答 |
|------|----------|
| 技術栈？ | 純 HTML/JS (推薦) |
| 功能範圍？ | 極簡 CRUD (推薦) |
| 成功標準？ | 功能正常運作 (推薦) |

**Superpowers 範**:
> "Ask questions one at a time to refine the idea... Prefer multiple choice questions when possible... Focus on understanding: purpose, constraints, success criteria"

**目的**: 避免「一次多問 overwhelm 用戶」，逐步聚焦需求。

---

#### 步驟 3: 提出 2-3 方案

**執行內容**:

| 方案 | Trade-off |
|------|-----------|
| A. 單一 HTML | 最快完成，但流程步驟少，難完整體驗 superpowers |
| B. 分離檔案 (推薦) | 清晰結構，多步驟實作，完整驗證流程 |
| C. Vite 打包 | 現代化，但引入工具複雜度 |

**Superpowers 範**:
> "Propose 2-3 different approaches with trade-offs... Lead with your recommended option and explain why"

**目的**: 強制「比較方案」而非直接跳到實作，避免「YAGNI 失效」。

---

#### 步驟 4: 分段呈現設計

**執行內容** (5 段逐一批准):

| 段落 | 內容 | 批准狀態 |
|------|------|----------|
| 1. 架構 | 檔案結構 + localStorage 存儲 | ✅ 批准 |
| 2. 組件 | HTML 結構 + JS 函數分解 | ✅ 批准 |
| 3. 資料流 | 用戶輸入 → localStorage → DOM 流程 | ✅ 批准 |
| 4. 錯誤處理 | localStorage 失敗/空輸入/無效操作 | ✅ 批准 |
| 5. 測試 | 手動測試 + 驗收檢查表 | ✅ 批准 |

**Superpowers 範**:
> "Present design in sections scaled to their complexity... Ask after each section whether it looks right so far... Cover: architecture, components, data flow, error handling, testing"

**目的**: 避免「一次丢完整設計文件」，分段確認減少回頭修改成本。

---

#### 步驟 5: 寫設計文件

**執行內容**:
- 建立目錄 `docs/superpowers/specs/`
- 寫入 `2026-03-30-todo-design.md`
- Git commit

**Superpowers 範**:
> "Write the validated design (spec) to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` and commit the design document to git"

**目的**: 規範化文件位置 + 版本控制，確保「設計有歷史紀錄」。

---

#### 步驟 6: Spec 自我審查

**執行內容**:
- ✅ Placeholder scan: 無 TBD/TODO
- ✅ Internal consistency: 架構、組件、資料流一致
- ✅ Scope check: 聚焦單一實作計劃
- ⚠️ Ambiguity check: 發現「忽略或顯示提示」模糊 → 修正為「靜默忽略」

**Superpowers 範**:
> "Placeholder scan... Internal consistency... Scope check... Ambiguity check... Fix any issues inline. No need to re-review"

**目的**: 自我審查避免「placeholder/模糊需求流到實作」，減少返工。

---

#### 步驟 7: 用戶審查 spec (User Review Gate)

**執行內容**: 等待用戶批准 spec 文件

**Superpowers 範** (HARD-GATE):
> "After the spec review loop passes, ask the user to review the written spec before proceeding... Wait for the user's response. Only proceed once the user approves."

**目的**: 「設計批准門檻」確保用戶在實作前有最終審核權。

---

#### 步驟 8: 調用 writing-plans

**執行內容**: 用戶批准 spec後，調用 `writing-plans` skill 建立實作計劃

**Superpowers 範**:
> "The terminal state is invoking writing-plans. Do NOT invoke frontend-design, mcp-builder, or any other implementation skill. The ONLY skill you invoke after brainstorming is writing-plans."

**目的**: 強制「設計 → 實作計劃 → 實作」順序，不允許跳級。

---

## 設計文件位置

`docs/superpowers/specs/2026-03-30-todo-design.md`

---

## 下一步

等待用戶批准 spec後，進入 `writing-plans` skill 建立實作計劃。