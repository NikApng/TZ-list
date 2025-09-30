
import { saveToLocalStorage, getToLocalStorage } from './constructor.js';
import { generateId } from './counterId.js';
import { renderCoundDelet } from './renderTask.js';
import { themeChanger } from './change-Theme.js';
import { openModalFriends } from '../js/friends/friend-btn.js';
openModalFriends()
themeChanger()



function RenderTodofromLocalStorage() {

  const listUL = document.querySelector('[data-ul-list]')
  if (!listUL) return
  const id = generateId()
  listUL.innerHTML = ''
  let tasks = getToLocalStorage('listUL') || []

  tasks.forEach((task) => {
    const taska = document.createElement('li')
    taska.classList.add('lefSide--LI')
    taska.dataset.id = task.id

    const inputReady = document.createElement('input')
    inputReady.type = 'checkbox'
    inputReady.classList.add('lefSide--inputReady')
    inputReady.checked = task.done

    const taskaText = document.createElement('span')
    taskaText.textContent = task.text
    taskaText.classList.add('lefSide--task')

    const boxTextAndInput = document.createElement('div')
    boxTextAndInput.classList.add('Box-LeftSide')

    const taskaDeleteBtn = document.createElement('button')
    taskaDeleteBtn.classList.add('lefSide--taskaBtn')

    taskaDeleteBtn.textContent = '🗑️'


    const taskaEditBtn = document.createElement('button')
    taskaEditBtn.classList.add('lefSide--taskaBtn')


    taskaEditBtn.textContent = '📝'




    if (task.done === true) {
      taskaText.style.color = 'gray'
      taskaText.style.textDecoration = 'line-through'
      taskaText.style.fontWeight = 'bold'
    } else {
      taskaText.style.color = 'white'
      taskaText.style.fontWeight = 'bold'
      taskaText.style.textDecoration = 'none'
    }


    listUL.appendChild(taska)
    taska.appendChild(boxTextAndInput)
    boxTextAndInput.appendChild(inputReady)
    boxTextAndInput.appendChild(taskaText)
    taska.appendChild(taskaEditBtn)
    taska.appendChild(taskaDeleteBtn)

    taskaDeleteBtn.addEventListener('click', (el) => {

      let tasks = getToLocalStorage('listUL') || []
      taska.remove()
      tasks = tasks.filter(t => t.id !== task.id)
      saveToLocalStorage('listUL', tasks)
      RenderTodofromLocalStorage()
      countDoneTask()
    })

    inputReady.addEventListener('change', () => {
      let tasks = getToLocalStorage('listUL') || []
      tasks = tasks.map(t =>
        t.id === task.id ? { ...t, done: inputReady.checked } : t
      )
      saveToLocalStorage('listUL', tasks)
      if (inputReady.checked) {
        taskaText.style.color = 'gray'
        taskaText.style.textDecoration = 'line-through'
      } else {
        taskaText.style.color = 'white'
        taskaText.style.fontWeight = 'bold'
        taskaText.style.textDecoration = 'none'
      }
      countDoneTask()

    })

    renderCoundDelet()
    countDoneTask()
  })
}
RenderTodofromLocalStorage()

export { RenderTodofromLocalStorage }

function countDoneTask() {

  const tasks = getToLocalStorage('listUL') || []
  const count = tasks.filter(taskas => taskas.done).length
  const counetr = document.querySelector('[data-count]')
  counetr.textContent = count

}





document.addEventListener('click', (e) => {

  if (e.target.closest('[data-create-btn]')) {

    const listUL = document.querySelector('[data-ul-list]')
    const menuAdder = document.createElement('div')

    const id = generateId()

    menuAdder.innerHTML = `
                    <div class="Menu-adder__container">
                        <div class="Menu-adder__header">
                            <button class="Menu-exit__menu--btn" data-remove type="button">✚</button>

                            <h3 class="Menu-text__header">Создать задачу:</h3> 
                            
                        </div>
                            <div class="Menu-bottom__container">
                                <input type="text" class="Menu-input" data-input-menu="${id}">
                                <button class="Menu-add__task--btn" data-add-task-in-menu="${id}" type="button">✚</button>
                            </div>
                            
                    </div>`

    const input = menuAdder.querySelector(`[data-input-menu="${id}"]`)

    const addBtn = menuAdder.querySelector(`[data-add-task-in-menu="${id}"]`)

    addBtn.addEventListener('click', () => {
      const valueInp = input.value.trim()
      const task = document.createElement('li')

      const text = document.createElement('span')

      const deleteBtn = document.createElement('button')

      const editBtn = document.createElement('button')



      text.textContent = input.value.trim()
      if (!input.value.trim()) return

      listUL.appendChild(task)
      task.appendChild(text)
      task.appendChild(editBtn)
      task.appendChild(deleteBtn)

      let tasks = getToLocalStorage('listUL') || []
      tasks.push({
        id: generateId(),
        text: valueInp,
        done: false
      })
      saveToLocalStorage('listUL', tasks)
      RenderTodofromLocalStorage()
      menuAdder.remove()
    })


    const rightMenu = document.querySelector('[data-right-menu]')
    rightMenu.appendChild(menuAdder)

    const btnRemove = document.querySelector('[data-remove]')
    btnRemove.addEventListener('click', () => {
      menuAdder.remove()
    })

  }

})
function deleteAllButton() {
  const btnDeleteAll = document.querySelector('[data-delete-all-btn]')

  btnDeleteAll.addEventListener('click', () => {
    if (document.querySelector('.accept__container')) return
    const acceptModal = document.createElement('div');
    acceptModal.innerHTML = `
    <div class="accept__container">
                        <div class="accept-header__container">
                            <span><h1>Вы точно хотите выполнить полную очистку своего списка дел?</h1></span>
                        </div>
                        <div class="accept-buttons__container">
                            <button data-delete-all-cancel class="accept-Remuve_btn"><span>Отмена</span></button>
                            <button data-delete-all-task-btn class="accept-Accept_btn"><span>Ок</span></button>
                        </div>
                    </div>
    `


    acceptModal.classList.add('active')

    document.body.appendChild(acceptModal)

    const modalContent = acceptModal.querySelector('.accept__container')
    setTimeout(() => modalContent.classList.add('active'), 10)


    const btnDeleteAllTasks = acceptModal.querySelector('[data-delete-all-task-btn]')
    btnDeleteAllTasks.addEventListener('click', () => {

      if (!modalContent) {
        modalContent.classList.remove('active')
      }

      acceptModal.remove()
      localStorage.removeItem('listUL')
      RenderTodofromLocalStorage()
      countDoneTask()
    })
    modalContent.querySelector('[data-delete-all-cancel]').addEventListener('click', () => {
      acceptModal.remove()
    })
    if (!modalContent) return
  })
}
deleteAllButton()

export { deleteAllButton };