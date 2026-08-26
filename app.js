const STORAGE_KEY = 'todos';

function genId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
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
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
        console.warn('localStorage 儲存失敗:', e);
    }
}

function renderTodos() {
    const list = document.getElementById('todo-list');
    const emptyHint = document.getElementById('empty-hint');
    const todos = loadTodos();
    
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
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '刪除';
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addTodo(text) {
    if (!text.trim()) return;
    
    const todos = loadTodos();
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
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos();
}

function deleteTodo(id) {
    const todos = loadTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return;
    
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

document.addEventListener('DOMContentLoaded', () => {
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