document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.btn--head')
    if(!btn) return

    const BurgMenu = document.querySelector('.menu')
    BurgMenu.classList.toggle('hidden')

})

