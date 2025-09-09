import { saveToStorage, getFromStorage } from './stogare.js';

let tasks = getFromStorage('tasks');

// ===== Добавление задачи =====
function addTask(title) {
  const newTask = { id: Date.now(), title };
  tasks.push(newTask);
  saveToStorage('tasks', tasks);
  renderTasks();
}

// ===== Удаление задачи =====
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveToStorage('tasks', tasks);
  renderTasks();
}

// ===== Рендеринг =====
function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = ''; // очищаем

  tasks.forEach(task => {
    const template = document.getElementById('taskTemplate');
    const listTask = template.content.cloneNode(true);

    listTask.querySelector('.task__title').textContent = task.title;
    listTask.querySelector('.task').dataset.id = task.id;

    list.appendChild(listTask);
  });
}

// ===== Обработчики =====

// Клик по кнопке "Создать"
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-create-btn]');
  const input = document.querySelector('[data-name-input]');
  if (!btn) return;

  if (input.value.trim().length <= 0) {
    const Error = document.querySelector('.main--content-right');

    Error.innerHTML = `
      <div class="error-bg">
        <h1 class="error-text">Поле не должно быть пустым</h1>
        <p>Введите название своего списка дел 🙂</p>
        <button class="error-btn">Понятно</button>
      </div>
    `;

    const btnError = document.querySelector('.error-btn');
    btnError.addEventListener('click', () => {
      Error.innerHTML = '';
    });

  } else {
    addTask(input.value.trim());
    input.value = '';
  }
});

// Enter для добавления
document.addEventListener('keydown', (e) => {
  const input = document.querySelector('[data-name-input]');
  if (e.key === 'Enter' && document.activeElement === input) {
    if (input.value.trim().length > 0) {
      addTask(input.value.trim());
      input.value = '';
    }
  }
});

// Удаление задачи
document.addEventListener('click', (e) => {
  const btnDelete = e.target.closest('[data-delete-btn]');
  if (!btnDelete) return;

  const taskItem = btnDelete.closest('.task');
  const id = Number(taskItem.dataset.id);
  deleteTask(id);
});

// ===== Первичная загрузка =====
renderTasks();