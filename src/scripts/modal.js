//функция открытия модального окна

export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscape);
}

//функция закрытия модального окна

export function closeModal() {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
}

//функция закрытия модального окна нажатием на клавишу "Esc"

export function closeEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    };
    document.removeEventListener('keydown', closeEscape);
} 

//функция открытия модального окна с картинкой карточки

export function openCardImage(evt) {
    evt.preventDefault();
    const imageOpen = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imageOpen);
}