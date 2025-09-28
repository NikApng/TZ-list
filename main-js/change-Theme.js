import { saveToLocalStorage, getToLocalStorage } from './constructor.js';



function themeChanger (){
const themeBtn = document.querySelector('[data-theme]')

const body =  document.querySelector('body')

themeBtn.addEventListener('click', (e)=>{
    
        body.classList.toggle('dark-theme')
        
    
})


}

export { themeChanger };