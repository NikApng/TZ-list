import { saveToLocalStorage, getToLocalStorage } from './constructor.js';



function themeChanger (){
const themeBtn = document.querySelector('[data-theme]')
const body =  document.querySelector('body')

const savedTheTheme = getToLocalStorage('theme')

if(savedTheTheme === 'dark'){
        body.classList.add('dark-theme')

}


themeBtn.addEventListener('click', (e)=>{
    
       const isDark =  body.classList.toggle('dark-theme')

       if(isDark){
        saveToLocalStorage('theme', 'dark')
       } else {
        saveToLocalStorage('theme', 'light')
       }

})

}

export { themeChanger };