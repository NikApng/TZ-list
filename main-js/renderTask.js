import { addListerr } from "./stogare";
function RenderTodofromLocalStorage() {
    
    
  const listUL = document.querySelector('[data-ul-list]')
  if (!listUL) return
  const id = generateId()
  listUL.innerHTML = ''
  let tasks = getToLocalStorage('listUL') || []

  tasks.forEach((task) => {
    addListerr()
    const taska = document.createElement('li')
    taska.classList.add('lefSide--LI')

    const inputReady = document.createElement('input')
    inputReady.type = 'checkbox'
    inputReady.classList.add('lefSide--inputReady')

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



export {RenderTodofromLocalStorage}