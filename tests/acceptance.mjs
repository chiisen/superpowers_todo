import { chromium } from 'playwright';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const p = new URL(req.url).pathname === '/' ? '/index.html' : new URL(req.url).pathname;
    const file = Bun.file(ROOT + p);
    return (await file.exists()) ? new Response(file) : new Response('404', { status: 404 });
  },
});
const base = `http://localhost:${server.port}/index.html`;

const results = [];
let allPass = true;
const check = (name, cond, detail = '') => {
  if (cond) results.push(`✅ ${name}${detail ? ' — ' + detail : ''}`);
  else { allPass = false; results.push(`❌ ${name}${detail ? ' — ' + detail : ''}`); }
};

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));

await page.goto(base);
await page.waitForSelector('#todo-list', { state: 'attached' });
await page.evaluate(() => localStorage.removeItem('todos'));
await page.reload();
await page.waitForSelector('#todo-list', { state: 'attached' });

await page.fill('#todo-input', '買牛奶'); await page.click('#add-btn');
let count = await page.locator('#todo-list li').count();
let firstText = count > 0 ? await page.locator('#todo-list li').first().locator('span').innerText() : '';
check('1. 點「新增」後項目出現', count === 1 && firstText.includes('買牛奶'), `count=${count}, text="${firstText}"`);

await page.fill('#todo-input', '寫程式'); await page.press('#todo-input', 'Enter');
count = await page.locator('#todo-list li').count();
check('2. 按 Enter 後項目出現', count === 2, `count=${count}`);

await page.locator('#todo-list li').first().locator('input[type=checkbox]').check();
const cls = await page.locator('#todo-list li').first().getAttribute('class');
check('3. 勾選後 li 有 completed 樣式', (cls ?? '').includes('completed'), `class="${cls}"`);

const before = await page.locator('#todo-list li').count();
await page.locator('#todo-list li').first().locator('button.delete-btn').click();
const after = await page.locator('#todo-list li').count();
check('4. 按「刪除」後項目消失', after === before - 1, `before=${before}, after=${after}`);

await page.reload();
await page.waitForSelector('#todo-list', { state: 'attached' });
const persisted = await page.locator('#todo-list li').count();
const ls = await page.evaluate(() => localStorage.getItem('todos'));
check('5. 重新載入後 todos 保留', persisted === after && !!ls, `persisted=${persisted}`);

check('無 JS 控制台錯誤', errors.length === 0, errors.join(' | ') || '無');

await browser.close();
server.stop();

console.log(results.join('\n'));
console.log(allPass ? '\nRESULT: ALL PASS' : '\nRESULT: FAILURES PRESENT');
process.exit(allPass ? 0 : 1);
