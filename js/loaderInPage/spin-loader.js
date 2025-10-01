function targetButtons() {
    const buttons = document.querySelector('[data-add-friend]')
    document.addEventListener('click', (e) => {

        if (e.target === buttons) {
            const loader = document.createElement('div')
            loader.classList.add('loader-container')
            loader.innerHTML = `
                                <div class="loader">

                                </div> `

            
            document.querySelector('body').appendChild(loader)
        }
    })
}

export { targetButtons }