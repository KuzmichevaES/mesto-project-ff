import '../pages/index.css';
import {openModal, closeModal, closeModalByOverlayClick} from './modal.js'
import {createCard, deleteCard, likeCard} from './card.js'
import {enableValidation, reloadValidation, clearValidation} from './validation.js';
import {getCurrentUser, getAllCards, updateUserData, loadNewCardData, updateUserAvatar} from './api.js';

// @todo: DOM узлы

const buttonProfileEdit = document.querySelector('.profile__edit-button'); 
const buttonProfileImageEdit = document.querySelector('.profile__image-edit'); 
const cardImages = document.querySelectorAll('.card__image'); 
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileImageEdit = document.querySelector('.popup_type_profile_image-edit');
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const buttonPopupNewCard = popupNewCard.querySelector('.popup__button');
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
export const cardTemplate = document.querySelector('#card-template').content;

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
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    updateUserData({
      name: nameInput.value,
      about: jobInput.value
    })
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(popupProfileEdit);
        submitButton.textContent = 'Сохранить';
    })
    .catch((err) => {
        console.log(err);
    });
}

//функция создания новой карточки
  
function handleSubmitAddNewCard(evt) {
    evt.preventDefault(); 
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    loadNewCardData({
      name: inputNewCardName.value,
      link: inputNewCardUrl.value
    })
    .then((cardData) => {
        const cardElement = createCard(cardData, deleteCard, likeCard, openCardImage, cardData.owner); 
        cardList.prepend(cardElement);
        closeModal(popupNewCard);
        submitButton.textContent = 'Сохранить';
        formNewPlace.reset();
    })
    .catch((err) => {
        console.log(err);
    })
  };

  //функция открытия модального окна с картинкой карточки

export function openCardImage(evt, card) {
    evt.preventDefault();
    photoPopupCardImage.src = card.link;
    photoPopupCardImage.alt = card.name;
    popupCardImageCaption.textContent = card.name;
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
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    updateUserAvatar({
      avatar: profileAvatarEditInput.value
    })
    .then((data) => {
        profileImage.style.backgroundImage = "url(" + data.avatar + ")";
        closeModal(popupProfileImageEdit);
        submitButton.textContent = 'Сохранить';
        formEditAvatarProfile.reset();
      })
    .catch((err) => {
        console.log(err);
    });
}

//слушатель на сабмит формы редактирования аватара
formEditAvatarProfile.addEventListener('submit', handleformEditAvatarProfile);

//вешаем обработчик клика на кнопку для открытия модального окна создания новой карточки

buttonProfileAdd.addEventListener('click', function(evt) {
    evt.preventDefault();
    formAddNewCard.reset();
    clearValidation(popupNewCard, validationConfig);
    reloadValidation(formAddNewCard, buttonPopupNewCard, validationConfig);
    openModal(popupNewCard);
});

//вешаем обработчик событий на форму создания новой карточки для отслеживания события "submit"

formNewPlace.addEventListener('submit', handleSubmitAddNewCard);

//вешаем обработчик клика на кнопку закрытия модального окна

buttonsPopupClose.forEach(function(item) {
    const popupActive = item.closest('.popup');
    item.addEventListener('click', function(evt) {
        closeModal(popupActive);
    });
});

popupAll.forEach(function(item) {
    //закрытие активного модального окна по клику вне окна

    item.addEventListener('click', closeModalByOverlayClick);
});
