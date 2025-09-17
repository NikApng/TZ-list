function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getToLocalStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}


function RenderTodofromLocalStorage() {
  const listUL = document.querySelector('[data-ul-list]')
  if (!listUL) return

  listUL.innerHTML = ''
  let tasks = getToLocalStorage('listUL') || []

  tasks.forEach((task) => {
    const taska = document.createElement('li')
    taska.classList.add('lefSide--LI')

    const inputReady = document.createElement('input')
    inputReady.type = 'checkbox'
    inputReady.classList.add('lefSide--inputReady')

    const taskaText = document.createElement('span')
    taskaText.textContent = task.text
    taskaText.classList.add('lefSide--task')


    const taskaDeleteBtn = document.createElement('button')
    taskaDeleteBtn.classList.add('lefSide--taskaBtn')

    taskaDeleteBtn.textContent = '🗑️'


    const taskaEditBtn = document.createElement('button')
    taskaEditBtn.classList.add('lefSide--taskaBtn')


    taskaEditBtn.textContent = '📝'

    inputReady.checked = task.done
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
    taska.appendChild(inputReady)
    taska.appendChild(taskaText)
    taska.appendChild(taskaEditBtn)
    taska.appendChild(taskaDeleteBtn)

    taskaDeleteBtn.addEventListener('click', (el) => {

      let tasks = getToLocalStorage('listUL') || []
      taska.remove()
      tasks = tasks.filter(t => t.id !== task.id)
      saveToLocalStorage('listUL', tasks)
      RenderTodofromLocalStorage()

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
    })



  })

}
RenderTodofromLocalStorage()






document.addEventListener('click', (e) => {
  if (e.target.closest('[data-create-btn]')) {

    const MenuIsopen = document.querySelector('.Menu-adder__container')

    if (MenuIsopen) {
      return
    }

    const listUL = document.querySelector('[data-ul-list]')
    const menuAdder = document.createElement('div')

    const id = Date.now()

    menuAdder.innerHTML = `
                    <div class="Menu-adder__container">
                        <div class="Menu-adder__header">
                            <button class="Menu-exit__menu--btn" data-remove type="button">✚</button>

                            <h3 class="Menu-text__header">Создание задачи</h3> 
                            
                        </div>
                            <div class="Menu-bottom__container">
                                <input type="text" class="Menu-input" data-input-menu="${id}">
                                <button class="Menu-add__task--btn" data-add-task-in-menu="${id}" type="button">✚</button>
                            </div>
                            
                    </div>`

    if (menuAdder == true) {
      const btn = document.querySelector('[data-create-btn]')
      btn.remove()
    }
    const input = menuAdder.querySelector(`[data-input-menu="${id}"]`)
    const addBtn = menuAdder.querySelector(`[data-add-task-in-menu="${id}"]`)

    addBtn.addEventListener('click', () => {
      const valueInp = input.value.trim()
      const task = document.createElement('li')

      const text = document.createElement('span')
      text.classList.add = ('LeftSide--task')

      const deleteBtn = document.createElement('button')

      const editBtn = document.createElement('button')



      text.textContent = input.value.trim()
      if (!input.value.trim()) return

      listUL.appendChild(task)
      task.appendChild(text)
      task.appendChild(editBtn)
      task.appendChild(deleteBtn)


      input.value = ''
      input.focus()

      let tasks = getToLocalStorage('listUL') || []
      tasks.push({
        id: id,
        text: valueInp,
        done: false
      })
      saveToLocalStorage('listUL', tasks)
      RenderTodofromLocalStorage()
    })

    const valueInp = input.value.trim()


    const rightMenu = document.querySelector('[data-right-menu]')
    rightMenu.appendChild(menuAdder)

    const btnRemove = document.querySelector('[data-remove]')
    btnRemove.addEventListener('click', () => {
      menuAdder.remove()
    })

  }
})
  const btnDeleteAll = document.querySelector('[data-delete-all-btn]')

  btnDeleteAll.addEventListener('click', () => {

    localStorage.removeItem('listUL')

    RenderTodofromLocalStorage()
  })