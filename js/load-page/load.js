import {RenderTodofromLocalStorage} from '../../main-js/stogare.js';
const actions = document.querySelectorAll('button[data-action]')

const loadViewPort = document.querySelector('[data-render-pages]')

const pages = {
    'main-menu': () => {
        
        return  `<div class="main--content-main">
                <section class="main--content-left">
                    <div class="left__section-main--container">
                        <div class="left__section-header">
                            <h2>Задачи</h2>

                            <div class="main-info__bottom">

                                <button class="btn-main__creater" data-create-btn
                                    style="color: rgb(247, 247, 247);">✚</button>
                                <button class="btn-main__deleter-all" data-delete-all-btn>удалить задачи</button>
                                <div class="counter__container">
                                    <span>выделено:<span data-count>0</span><button data-delete-count
                                            class="btn-delete_count">🗑️</button></span>
                                </div>
                            </div>

                        </div>
                        <div class="left__section-middle">
                            <ul class="task-list" id="taskList" aria-live="polite" data-ul-list>

                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Правая часть -->
                <div class="main--content-right" data-right-menu>

                </div>
            </div>
        </main> ` 
    
    },
    'settings': () => {
        return `<div class="settings__menu-main-container">
            <div class="settings__header-name">
                <h1>Настройки </h1>
            </div>

            <div class="settings__buttons-container">
                <h3>Сменить язык</h3>
                <select>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
                <button>Принять</button>

                <button><span>  Сменить</span> <span> пароль</span></button>

                <button> <span>Принять</span> <span> Цвет</span></button>
                <select>
                    <option value="wh">белый</option>
                    <option value="en">желтый</option>
                    <option value="es">Español</option>
                </select>
            </div>

        </div>`},
    'FAQ': () => {
        return `<div class"container-faq-page">
            <h1>FAQ</h1>

            <p>Разработчик данного списка дел сильно старается по этому <br>
                не разочаровывайтесь в его спосоностях все будет исправлено
            </p>
        </div>`}

}

actions.forEach(btn => {
    
    btn.addEventListener('click', (e) => {
        loadViewPort.innerHTML = ''
        const action = e.target.dataset.action

        if (pages[action]) {
            loadViewPort.innerHTML = pages[action]()

            if(action === 'main-menu'){
            RenderTodofromLocalStorage()
        }
            
        }
        
        

    })
})