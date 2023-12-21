//функция открытия модального окна

export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscape);
}

//функция закрытия модального окна

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscape);
}

//функция закрытия модального окна нажатием на клавишу "Esc"

export function closeEscape(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_is-opened');
        closeModal(popupActive);
    };
} 

//функция закрытия модального окна по клику на оверлей

export function closeModalByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    };
}