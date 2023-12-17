import '../pages/index.css';
import {openModal, closeModal, closeEscape, closeModalByOverlayClick} from './modal.js'
import {createCard, deleteCard, likeCard} from './card.js'
import {enableValidation} from './validation.js';
import {clearValidation} from './validation.js';
import {getCurrentUser, getAllCards, updateUserData, loadNewCardData, updateUserAvatar} from './api.js';

// @todo: DOM узлы

const buttonProfileEdit = document.querySelector('.profile__edit-button'); 
const buttonProfileImageEdit = document.querySelector('.profile__image-edit'); 
const cardImages = document.querySelectorAll('.card__image'); 
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileImageEdit = document.querySelector('.popup_type_profile_image-edit');
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const buttonsPopupClose = document.querySelectorAll('.popup__close');
const popupAll = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const formEditAvatarProfile = document.querySelector('form[name="new-profile_image"]');
const formAddNewCard = document.querySelector('form[name="new-place"]');
export const profileImage = document.querySelector('.profile__image');
const profileAvatarEditInput = document.querySelector('.popup__input-new-profile_image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
export let profileTitle = document.querySelector('.profile__title');
export let profileDescription = document.querySelector('.profile__description');

//поиск DOM-элементов для функции создания новой карточки
export const formNewPlace = document.querySelector('form[name="new-place"]');
export const inputNewCardName = document.querySelector('.popup__input_type_card-name');
export const inputNewCardUrl = document.querySelector('.popup__input_type_url');

//поиск DOM-элементов для функции открытия картинки карточки в модальном окне

const popupCardImageType = document.querySelector('.popup_type_image');
const photoPopupCardImage = document.querySelector('.popup__image');
const popupCardImageCaption = document.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу

export const cardList = document.querySelector('.places__list');

const drawCards = () => {
    Promise.all([getCurrentUser(), getAllCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = "url(" + userData.avatar + ")";
        
        cardsData.forEach(function (card) {
        const cardElement = createCard(card, deleteCard, likeCard, openCardImage, userData);
        cardList.append(cardElement); 
    });
    })
    .catch((err) => {
        console.log(err);
    });
}

drawCards();

//параметры валидации

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

//включаем валидацию для всех input

enableValidation(validationConfig); 

//функция редактирования данных профиля

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    updateUserData({
      name: nameInput.value,
      about: jobInput.value
    });
    const popupActive = document.querySelector('.popup_is-opened');
    closeModal(popupActive);
}

//функция создания новой карточки
  
function handleSubmitAddNewCard(evt) {
    evt.preventDefault(); 
    loadNewCardData({
      name: inputNewCardName.value,
      link: inputNewCardUrl.value
    })
    .then((data) => {
        cardList.replaceChildren();
        drawCards();
        const popupActive = document.querySelector('.popup_is-opened');
        closeModal(popupActive);
        formNewPlace.reset();
    })
    .catch((err) => {
        console.log(err);
    })
  };

  //функция открытия модального окна с картинкой карточки

export function openCardImage(evt) {
    evt.preventDefault();
    photoPopupCardImage.src = evt.target.src;
    photoPopupCardImage.alt = evt.target.alt;
    popupCardImageCaption.textContent = evt.target.alt;
    openModal(popupCardImageType);
}

  //вешаем обработчик события "click" на кнопку открытия модального окна редактирования профиля

buttonProfileEdit.addEventListener('click', function(evt) {
    evt.preventDefault();
    clearValidation(popupProfileEdit, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupProfileEdit);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formEditProfile.addEventListener('submit', handleProfileFormSubmit); 

//слушатель для открытия модального окна редактирования аватара

buttonProfileImageEdit.addEventListener('click', function(evt) {
    evt.preventDefault();
    openModal(popupProfileImageEdit);
})

//функция редактирования аватара

function handleformEditAvatarProfile(evt) {
    evt.preventDefault(); 
    console.log(profileAvatarEditInput.value);
    updateUserAvatar({
      avatar: profileAvatarEditInput.value
    });
    const popupActive = document.querySelector('.popup_is-opened');
    closeModal(popupActive);
}

//слушатель на сабмит формы редактирования аватара
formEditAvatarProfile.addEventListener('submit', handleformEditAvatarProfile);

//вешаем обработчик клика на кнопку для открытия модального окна создания новой карточки

buttonProfileAdd.addEventListener('click', function(evt) {
    evt.preventDefault();
    formAddNewCard.reset();
    clearValidation(popupNewCard, validationConfig);
    openModal(popupNewCard);
});

//вешаем обработчик событий на форму создания новой карточки для отслеживания события "submit"

formNewPlace.addEventListener('submit', handleSubmitAddNewCard);

//вешаем обработчик клика на кнопку закрытия модального окна

buttonsPopupClose.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        const popupActive = evt.target.closest('.popup_is-opened');
        closeModal(popupActive);
    });
});

popupAll.forEach(function(item) {
    //закрытие активного модального окна по клику вне окна

    item.addEventListener('click', closeModalByOverlayClick);
});
