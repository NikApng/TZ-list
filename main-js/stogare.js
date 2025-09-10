function saveToLocalStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value))
}

function getToLocalStorage(key){
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

function RenderTodofromLocalStorage (){

 const listUL = document.querySelector('[data-ul-list]')
  if (!listUL) return

  listUL.innerHTML = ''

 let tasks = getToLocalStorage('listUL') || []


 tasks.forEach(task =>{

  const taska = document.createElement('li')
  
  const taskaText = document.createElement('span')
    taskaText.textContent = task
  const taskaDeleteBtn = document.createElement('button')
    taskaDeleteBtn.textContent = '🗑️'
  const taskaEditBtn = document.createElement('button')
      taskaEditBtn.textContent = '/'

    listUL.appendChild(taska)
    taska.appendChild(taskaText)
    taska.appendChild(taskaEditBtn)
    taska.appendChild(taskaDeleteBtn)

  


 })


}
RenderTodofromLocalStorage()

document.addEventListener('click', (e)=>{
  const input = document.querySelector('[data-name-input]')
  const listUL = document.querySelector('[data-ul-list]')

  if(e.target.closest('[data-create-btn]')){
    
    const task = document.createElement('li')
    const text = document.createElement('span')
    const deleteBtn = document.createElement('button')
    const editBtn = document.createElement('button')
    editBtn.textContent = '/'
    deleteBtn.textContent = '🗑️'
    text.textContent = input.value.trim()


    listUL.appendChild(task)
    task.appendChild(text)
    task.appendChild(editBtn)
    task.appendChild(deleteBtn)

    

    let tasks = getToLocalStorage('listUL') || []
    tasks.push(input.value.trim())
    saveToLocalStorage('listUL', tasks)
    RenderTodofromLocalStorage()
  }
})