// function saveToLocalStorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value))
// }

// function getToLocalStorage(key) {
//   const data = localStorage.getItem(key)
//   return data ? JSON.parse(data) : null
// }

// function RenderTodofromLocalStorage() {

//   const listUL = document.querySelector('[data-ul-list]')
//   if (!listUL) return

//   listUL.innerHTML = ''


//   // localStorage.removeItem('listUL')



//   let tasks = getToLocalStorage('listUL') || []

//   tasks.forEach(task => {

//     const taska = document.createElement('li')
//     taska.style.borderBottom = '1px black solid'
//     taska.style.margin = '5%'

//     const inputReady = document.createElement('input')
//     inputReady.type = 'checkbox'




//     const taskaText = document.createElement('span')
//     taskaText.textContent = task.text

//     const taskaDeleteBtn = document.createElement('button')
//     taskaDeleteBtn.style.marginLeft = '10px'
//     taskaDeleteBtn.style.border = 'dashed'
//     taskaDeleteBtn.style.borderRadius = '1rem'
//     taskaDeleteBtn.style.background = 'transparent'
//     taskaDeleteBtn.style.cursor = 'pointer'

//     taskaDeleteBtn.textContent = '🗑️'


//     const taskaEditBtn = document.createElement('button')
//     taskaEditBtn.style.marginLeft = '10px'
//     taskaEditBtn.style.border = 'dashed'
//     taskaEditBtn.style.borderRadius = '1rem'
//     taskaEditBtn.style.background = 'transparent'
//     taskaEditBtn.style.cursor = 'pointer'
//     taskaEditBtn.style.textAlign = 'center'

//     taskaEditBtn.textContent = '📝'

//     inputReady.checked = task.done
//     if (task.done === true) {
//       taskaText.style.color = 'gray'
//       taskaText.style.textDecoration = 'line-through'

//     } else {
//       taskaText.style.color = 'white'
//       taskaText.style.fontWeight = 'bold'
//       taskaText.style.textDecoration = 'none'
//     }


//     listUL.appendChild(taska)
//     taska.appendChild(inputReady)
//     taska.appendChild(taskaText)
//     taska.appendChild(taskaEditBtn)
//     taska.appendChild(taskaDeleteBtn)
//     const btnDeleteAll = document.querySelector('[data-delete-all-btn]')
//     btnDeleteAll.textContent = 'очистить список'


//     btnDeleteAll.addEventListener('click', () => {

//       localStorage.removeItem('listUL')

//       RenderTodofromLocalStorage()
//     })

//     taskaDeleteBtn.addEventListener('click', (el) => {

//       let tasks = getToLocalStorage('listUL') || []
//       taska.remove()
//       tasks = tasks.filter(t => t.id !== task.id)
//       saveToLocalStorage('listUL', tasks)
//       RenderTodofromLocalStorage()

//     })

//     inputReady.addEventListener('change', () => {
//       let tasks = getToLocalStorage('listUL') || []
//       tasks = tasks.map(t =>
//         t.id === task.id ? { ...t, done: inputReady.checked } : t
//       )
//       saveToLocalStorage('listUL', tasks)
//       if (inputReady.checked) {
//         taskaText.style.color = 'gray'
//         taskaText.style.textDecoration = 'line-through'
//       } else {
//         taskaText.style.color = 'white'
//         taskaText.style.fontWeight = 'bold'
//         taskaText.style.textDecoration = 'none'
//       }
//     })



//   })
// }
// RenderTodofromLocalStorage()

// document.addEventListener('click', (e) => {
//   const input = document.querySelector('[data-name-input]')

//   const listUL = document.querySelector('[data-ul-list]')

//   if (e.target.closest('[data-create-btn]')) {

//     const task = document.createElement('li')

//     const ids = Date.now()
//     const text = document.createElement('span')

//     const deleteBtn = document.createElement('button')


//     const editBtn = document.createElement('button')

//     editBtn.textContent = '/'
//     deleteBtn.textContent = '🗑️'


//     text.textContent = input.value.trim()
//     if (!input.value.trim()) return

//     listUL.appendChild(task)
//     task.appendChild(text)
//     task.appendChild(editBtn)
//     task.appendChild(deleteBtn)


//     let tasks = getToLocalStorage('listUL') || []
//     tasks.push({
//       id: ids,
//       text: input.value.trim(),
//       done: false
//     })
//     saveToLocalStorage('listUL', tasks)
//     RenderTodofromLocalStorage()

//     input.value = ''
//     input.focus()
//   }
// })


document.addEventListener('click', (e)=>{

  if(e.target.closest('[data-create-btn]')){
      
    const menuAdder = document.createElement('div')

    menuAdder.innerHTML = `
    <div class="new">
    <h3>Создание задачи</h3>
    </div>
`
    const rightMenu = document.querySelector('[data-right-menu]')
    rightMenu.appendChild(menuAdder)

}
    
})