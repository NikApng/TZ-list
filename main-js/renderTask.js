
import { saveToLocalStorage, getToLocalStorage } from './constructor.js';
import { RenderTodofromLocalStorage } from './stogare.js';
function renderCoundDelet () {
  const delteCountBtn = document.querySelector('[data-delete-count]');
delteCountBtn.addEventListener('click', () => {
  let tasks = getToLocalStorage('listUL') || []

  tasks = tasks.filter(t => !t.done)

  saveToLocalStorage('listUL', tasks)
  RenderTodofromLocalStorage()
});

}
export {renderCoundDelet}