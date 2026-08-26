const STORAGE_KEY = 'todos';

function genId() {
    const c = (typeof self !== 'undefined' && self.crypto) || (typeof crypto !== 'undefined' ? crypto : null);
    if (c && typeof c.randomUUID === 'function') {
        return c.randomUUID();
    }
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
}

function isValidTodo(t) {
    return t && typeof t.id !== 'undefined' && typeof t.text === 'string' && typeof t.completed === 'boolean';
}

function loadTodos() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(isValidTodo);
    } catch (e) {
        console.warn('localStorage 載入失敗:', e);
        return [];
    }
}

function saveTodos(todos) {
    const warning = document.getElementById('storage-warning');
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        if (warning) warning.hidden = true;
    } catch (e) {
        console.warn('localStorage 儲存失敗:', e);
        if (warning) {
            warning.textContent = '⚠️ 待辦事項無法儲存（localStorage 可能已滿或被停用），本次變更不會保留。';
            warning.hidden = false;
        }
    }
}

let todos = [];

function renderTodos() {
    const list = document.getElementById('todo-list');
    const emptyHint = document.getElementById('empty-hint');
    
    list.innerHTML = '';
    
    if (todos.length === 0) {
        emptyHint.hidden = false;
        return;
    }
    emptyHint.hidden = true;


    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.dataset.id = todo.id;
        
        const label = document.createElement('label');
        label.className = 'todo-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        const span = document.createElement('span');
        span.textContent = todo.text;

        label.appendChild(checkbox);
        label.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.type = 'button';
        deleteBtn.textContent = '刪除';
        deleteBtn.setAttribute('aria-label', '刪除：' + todo.text);

        li.appendChild(label);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addTodo(text) {
    if (!text.trim()) return;
    
    const newTodo = {
        id: genId(),
        text: text.trim(),
        completed: false
    };
    
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos();
}

function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return;
    
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

document.addEventListener('DOMContentLoaded', () => {
    todos = loadTodos();
    renderTodos();
    
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
        input.focus();
    });
    
    list.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        
        const id = li.dataset.id;
        
        if (e.target.type === 'checkbox') {
            toggleTodo(id);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTodo(id);
        }
    });
});