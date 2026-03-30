# Todo List 設計規格

**目的**: 驗證 superpowers 開發流程

## 1. 架構

```
superpowers_todo/
├── index.html      # 主頁面，容器結構
├── app.js          # 應用邏輯：CRUD 操作 + localStorage
├── style.css       # 樸素樣式
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-03-30-todo-design.md
```

純前端、無後端、localStorage 作為唯一資料存儲。直接用瀏覽器打開 `index.html` 即可運行。

## 2. 組件

### HTML 結構

- `<header>` - 標題 + 新增輸入框
- `<ul id="todo-list">` - Todo 列表容器
- `<li>` (動態生成) - 每個 Todo 項目，含 checkbox + 文字 + 刪除按鈕

### JS 模組 (單一 `app.js`，函數分解)

- `renderTodos()` - 渲染列表
- `addTodo(text)` - 新增
- `toggleTodo(id)` - 切換完成狀態
- `deleteTodo(id)` - 刪除
- `saveTodos()` / `loadTodos()` - localStorage 操作

## 3. 資料流

```
用戶輸入 → addTodo() → saveTodos() → localStorage
                ↓
           renderTodos() → 更新 DOM

localStorage → loadTodos() (初始化) → renderTodos() → DOM
```

### 資料結構

```js
todos = [
  { id: timestamp, text: "買牛奶", completed: false }
]
```

## 4. 錯誤處理

- **localStorage 失敗**: `try-catch` 包裹，失敗時 console.warn，不阻塞 UI
- **空輸入**: 新增時檢查空字串，靜默忽略不執行新增
- **無效操作**: 刪除/切換不存在 ID時，靜默忽略

## 5. 測試

### 手動測試

打開瀏覽器，逐一驗證 CRUD 功能。無自動化測試框架。

### 驗收檢查表

1. 新增 todo → 出現在列表
2. 勾選 todo → completed 樣式變化
3. 刪除 todo → 從列表消失
4. 重新載入頁面 → todos 保留

## 成功標準

功能正常運作：能在瀏覽器新增/完成/刪除 todo，localStorage 持久化。