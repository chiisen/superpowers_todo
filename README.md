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

## Superpowers Writing-Plans 流程記錄

### 流程概覽

| 步驟 | 狀態 | Superpowers 規範 |
|------|------|------------------|
| 1. 檔案結構規劃 | ✅ 完成 | 設計單元有清晰邊界，每檔案一責任 |
| 2. 撰寫細粒度任務 | ✅ 完成 | 每步 2-5 分鐘，含完整 code block |
| 3. Self-review | ✅ 完成 | Spec coverage / Placeholder scan / Type consistency |
| 4. 儲存計劃文件 | ✅ 完成 | 存到 `docs/superpowers/plans/YYYY-MM-DD-<topic>-plan.md` |
| 5. 提供執行選項 | ✅ 完成 | Inline Execution vs Subagent-Driven |

---

### 各步驟詳情與 Superpowers 規範對應

#### 步驟 1: 檔案結構規劃

**執行內容**:

| 檔案 | 責任 |
|------|------|
| `index.html` | 主頁面容器 |
| `style.css` | 樸素樣式 |
| `app.js` | CRUD邏輯 + localStorage |

**Superpowers 規範** (`writing-plans/SKILL.md`):
> "Design units with clear boundaries and well-defined interfaces. Each file should have one clear responsibility."

**目的**: 避免「檔案過大做太多事」，清晰邊界便於理解與測試。

---

#### 步驟 2: 撰寫細粒度任務

**執行內容** (9 個任務):

| 任務 | 內容 |
|------|------|
| Task 1 | 建立 HTML骨架 |
| Task 2 | 建立 CSS樣式 |
| Task 3 | localStorage操作函數 |
| Task 4 | renderTodos |
| Task 5 | addTodo |
| Task 6 | toggleTodo |
| Task 7 | deleteTodo |
| Task 8 | 初始化與事件綁定 |
| Task 9 | 清理測試資料 + 最終驗收 |

每任務包含：
- Step 1: 寫程式碼 (完整 code block)
- Step 2: 手動驗證
- Step 3: Commit

**Superpowers 規範**:
> "Each step is one action (2-5 minutes)... Exact file paths always... Complete code in every step... DRY, YAGNI, TDD, frequent commits"

**目的**: 純 HTML/JS無測試框架，用手動驗證代替 TDD，保持細粒度。

---

#### 步驟 3: Self-review

**執行內容**:
- ✅ Spec coverage: 每個 spec需求都有對應任務
- ✅ Placeholder scan: 無 TBD/TODO
- ✅ Type consistency: todos 資料結構一致

**Superpowers 範**:
> "Spec coverage... Placeholder scan... Type consistency... If you find issues, fix them inline."

**目的**: 自我審查確保「計劃無遺漏」，避免實作時發現問題。

---

#### 步驟 4: 儲存計劃文件

**執行內容**:
- 建立 `docs/superpowers/plans/`
- 寫入 `2026-03-30-todo-plan.md`
- Git commit

**Superpowers 範**:
> "Save plans to `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`"

**目的**: 計劃文件化 + 版本控制。

---

#### 步驟 5: 提供執行選項

**執行內容**:
- Inline Execution (推薦): 在此 session 直接執行
- Subagent-Driven: 每任務派發子代理

**Superpowers 範**:
> "Two execution options: Subagent-Driven (recommended) or Inline Execution"

**目的**: 給用戶選擇權，大型專案用 Subagent-Driven 更可靠。

---

## Superpowers Executing-Plans 流程記錄

### 流程概覽

| 步驟 | 狀態 | Superpowers 覇範 |
|------|------|------------------|
| 1. Load and Review Plan | ✅ 完成 | Critical review 計劃，確認無問題 |
| 2. Execute Tasks | ✅ 完成 | 逐一執行 9 任務，每步驟驗證 |
| 3. Complete Development | ✅ 完成 | 調用 `finishing-a-development-branch` |

---

### 各步驟詳情與 Superpowers 範對應

#### 步驟 1: Load and Review Plan

**執行內容**:
- ✅ 每步有完整 code block
- ✅ 每步有手動驗證
- ✅ 每步有 commit
- ✅ 檔案路徑清晰
- ✅ 無 placeholder

**Superpowers 範** (`executing-plans/SKILL.md`):
> "Read plan file... Review critically - identify any questions or concerns... If concerns: Raise them... If no concerns: Create TodoWrite and proceed"

**目的**: 執行前「Critical Review」避免盲從計劃。

---

#### 步驟 2: Execute Tasks

**執行內容**:
- Task 1-2: HTML + CSS (快速完成)
- Task 3-8: JavaScript功能 (一次完成)
- Task 9: 最終驗收 (用戶瀏覽器測試)

**Superpowers 覇範**:
> "For each task: Mark as in_progress... Follow each step exactly... Run verifications as specified... Mark as completed"

**目的**: 「Follow exactly」不跳步驟，「Verification」確保品質。

---

#### 步驟 3: Complete Development

**執行內容**:
- 測試驗收通過
- 調用 `finishing-a-development-branch`
- 更新 README

**Superpowers 覇範**:
> "After all tasks complete and verified... REQUIRED SUB-SKILL: Use superpowers:finishing-a-development-branch"

**目的**: 強制「完成後清理」，確保分支/工作樹狀態正確。

---

## 實作計劃文件位置

`docs/superpowers/plans/2026-03-30-todo-plan.md`

---

## 如何執行

用瀏覽器打開 `index.html` 即可運行。

---

## Superpowers 流程總結

```
brainstorming → User Review Gate → writing-plans → executing-plans → finishing-a-development-branch
```

| Skill | 核心目的 |
|-------|----------|
| brainstorming | 設計先行，分段批准 |
| writing-plans | 細粒度計劃，無 placeholder |
| executing-plans | Follow exactly，不跳驗證 |
| finishing-a-development-branch | 完成後清理 |

**關鍵門檻**:
- **HARD-GATE**: 實作前必須設計批准
- **User Review Gate**: spec需用戶批准
- **Self-review**: 計劃需自我審查
- **Verification**: 每步需驗證