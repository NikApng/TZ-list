document.addEventListener('click', (e)=>{
    if(e.target.closest('.btn--head')){
    

    const BurgMenu = document.querySelector('.menu')
    if(!BurgMenu) return
    BurgMenu.classList.toggle('hidden')
} 
})

