
import { generateId } from '../../main-js/counterId.js';
import { targetButtons } from '../loaderInPage/spin-loader.js';


function openModalFriends() {
    const openModalFriendsBtn = document.querySelector('[data-add-friend]')

    openModalFriendsBtn.addEventListener('click', (e) => {
        targetButtons()
        setTimeout(() => {
            
            const modalContainer = document.createElement('div')

            modalContainer.classList.add('modal__friends-container')
            
            const loader = document.querySelector('.loader-container')
                loader.remove()

            modalContainer.innerHTML = `
            <div class="in--modal-container">
                      <h1>Друзья:</h1>

            <div class="friends__adder-container">
                <button>+</button>
                <a href="#recomendFriends">рекомендуемые друзья</a>
            </div>

            <div class="table__friends_user-container">
                <ul class="table__users--list">
                    <li class="list__user-li"><div class="user">
                        <img src="../server/users-photo/46Koja(2).jpg" width='50' alt="User">
                        <svg class="online-indicator" width="12" height="12" viewBox="0 0 12 12">
                            <circle cx="6" cy="6" r="5" fill="#00ff5eff"/>
                        </svg>
                        </div>
                        <span>Санек</span> <button data-dele-firend="${generateId()}" >-</button>
                    </li>
                    <li class="list__user-li"><div class="user">
                        <img src="../server/users-photo/46Koja(2).jpg" width='50' alt="User">
                        <svg class="online-indicator" width="12" height="12" viewBox="0 0 12 12">
                            <circle cx="6" cy="6" r="5" fill="#00ff5eff"/>
                        </svg>
                        </div>
                        <span>Санек</span> <button data-dele-firend="${generateId()}" >-</button>
                    </li>
                    <li class="list__user-li"><div class="user">
                        <img src="../server/users-photo/46Koja(2).jpg" width='50' alt="User">
                        <svg class="online-indicator" width="12" height="12" viewBox="0 0 12 12">
                            <circle cx="6" cy="6" r="5" fill="#ff8800ff"/>
                        </svg>
                        </div>
                        <span>Санек</span> <button data-dele-firend="${generateId()}" >-</button>
                    </li>
                </ul>
            </div>

            </div>
            `
            document.body.appendChild(modalContainer)

            setTimeout(() => {
                modalContainer.classList.add('show')
            }, 10)

            modalContainer.addEventListener('click', (el) => {
                if (el.target === modalContainer) {
                    modalContainer.remove()
                }
            })

        }, 1000)
    })




}

export { openModalFriends }






function name() {


}