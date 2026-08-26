const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf-8');

function setupDom(localStorageSeed) {
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/' });
  const { window } = dom;

  if (localStorageSeed !== undefined) {
    window.localStorage.setItem('todos', localStorageSeed);
  }

  window.eval(appJs);
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

  return window;
}

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}\n     ${e.message}`);
    failed++;
  }
}

console.log('— 子任務 1: 點「新增」按鈕 → 項目出現在列表');
test('新增後 list 出現 1 個 li', () => {
  const w = setupDom();
  w.document.getElementById('todo-input').value = '買牛奶';
  w.document.getElementById('add-btn').click();
  const items = w.document.querySelectorAll('#todo-list li');
  assert.strictEqual(items.length, 1);
  assert.strictEqual(items[0].querySelector('span').textContent, '買牛奶');
});

console.log('— 子任務 2: 輸入文字按 Enter → 項目出現在列表');
test('按 Enter 後 list 出現 1 個 li', () => {
  const w = setupDom();
  const input = w.document.getElementById('todo-input');
  input.value = '買麵包';
  input.dispatchEvent(new w.KeyboardEvent('keypress', { key: 'Enter' }));
  const items = w.document.querySelectorAll('#todo-list li');
  assert.strictEqual(items.length, 1);
  assert.strictEqual(items[0].querySelector('span').textContent, '買麵包');
});

console.log('— 子任務 3: 勾選 checkbox → completed 樣式');
test('勾選後 li 加上 completed class', () => {
  const w = setupDom();
  w.document.getElementById('todo-input').value = '買雞蛋';
  w.document.getElementById('add-btn').click();
  w.document.querySelector('#todo-list li input[type=checkbox]').click();
  const li = w.document.querySelector('#todo-list li');
  assert.ok(li.classList.contains('completed'), 'li 應有 completed class');
});

console.log('— 子任務 4: 按「刪除」→ 項目從列表消失');
test('刪除後 list 清空', () => {
  const w = setupDom();
  w.document.getElementById('todo-input').value = '買水果';
  w.document.getElementById('add-btn').click();
  w.document.querySelector('#todo-list li .delete-btn').click();
  const items = w.document.querySelectorAll('#todo-list li');
  assert.strictEqual(items.length, 0);
});

console.log('— 子任務 5: 重新載入頁面 → todos 保留');
test('reload 後 todos 仍在', () => {
  const w1 = setupDom();
  w1.document.getElementById('todo-input').value = '持久化測試';
  w1.document.getElementById('add-btn').click();
  const saved = w1.localStorage.getItem('todos');
  assert.ok(saved && saved.includes('持久化測試'), 'localStorage 應已寫入');

  const w2 = setupDom(saved);
  const items = w2.document.querySelectorAll('#todo-list li');
  assert.strictEqual(items.length, 1);
  assert.strictEqual(items[0].querySelector('span').textContent, '持久化測試');
});

console.log(`\n結果：通過 ${passed} / 失敗 ${failed}`);
process.exit(failed > 0 ? 1 : 0);
