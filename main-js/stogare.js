// ../main-js/stogare.js
// Хранилище + рендер задач с самовосстановлением данных из localStorage

const STORAGE_KEY = 'listUL';

// ---------- утилиты ----------
const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

// Безопасный парсер: всегда отдаёт МАССИВ
function safeParseArray(str) {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadTasks() {
  // лечим старые кривые значения вроде {}
  const raw = localStorage.getItem(STORAGE_KEY);
  let tasks = safeParseArray(raw);

  // миграция: если вдруг раньше хранились просто строки — оборачиваем
  if (tasks.length && typeof tasks[0] === 'string') {
    tasks = tasks.map(t => ({ id: uid(), text: t, done: false }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- DOM ссылки ----------
const input = document.querySelector('[data-name-input]');
const listUL = document.querySelector('[data-ul-list]');

// ---------- состояние ----------
let tasks = loadTasks(); // массив [{id, text, done}]

// ---------- рендер ----------
function render() {
  listUL.innerHTML = '';

  // страховка от не-массива
  if (!Array.isArray(tasks)) {
    tasks = [];
    saveTasks(tasks);
  }

  tasks.forEach(({ id, text, done }) => {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.className = 'task-item';

    // чекбокс "выполнено"
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'task-check';
    check.checked = !!done;
    check.dataset.action = 'toggle';

    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'task-text';
    if (done) span.style.textDecoration = 'line-through';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.textContent = '✏️';
    editBtn.title = 'Редактировать';
    editBtn.dataset.action = 'edit';

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = '🗑️';
    delBtn.title = 'Удалить';
    delBtn.dataset.action = 'delete';

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    listUL.appendChild(li);
  });
}

// ---------- операции ----------
function addTask(value) {
  const text = value.trim();
  if (!text) return;

  // защита: если кто-то снова убьёт формат в localStorage
  if (!Array.isArray(tasks)) tasks = [];

  tasks.push({ id: uid(), text, done: false });
  saveTasks(tasks);
  input.value = '';
  input.focus();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  render();
}

function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  saveTasks(tasks);
  render();
}

function startEditTask(id, li) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const currentSpan = li.querySelector('.task-text');
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = task.text;
  inputEdit.className = 'task-edit-input';
  inputEdit.setAttribute('aria-label', 'Редактировать задачу');

  li.replaceChild(inputEdit, currentSpan);
  inputEdit.focus();
  inputEdit.select();

  const commit = () => {
    const newText = inputEdit.value.trim();
    if (newText) {
      task.text = newText;
      saveTasks(tasks);
    }
    render();
  };

  inputEdit.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') render();
  });
  inputEdit.addEventListener('blur', commit);
}

// ---------- события ----------
document.addEventListener('click', (e) => {
  // добавить задачу
  if (e.target.closest('[data-create-btn]')) {
    addTask(input.value);
    return;
  }

  // действия внутри списка
  const li = e.target.closest('li');
  const id = li?.dataset.id;

  // чекбокс
  if (e.target.matches('input.task-check[data-action="toggle"]')) {
    toggleTask(id);
    return;
  }

  // кнопки
  const btn = e.target.closest('button[data-action]');
  if (btn) {
    const action = btn.dataset.action;
    if (action === 'delete') deleteTask(id);
    if (action === 'edit') startEditTask(id, li);
  }
});

// Добавление по Enter из поля ввода
input?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask(input.value);
});

// ---------- инициализация ----------
// если в localStorage лежит {}, то здесь мы его «вылечим»
if (!Array.isArray(tasks)) {
  tasks = [];
  saveTasks(tasks);
}
render();
