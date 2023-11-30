import {initialCards} from './cards.js';
import '../pages/index.css';
import {openModal, closeModal, closeEscape, closeModalByOverlayClick} from './modal.js'
import {createCard, deleteCard, createNewCard, likeCard} from './cards.js'

// @todo: DOM узлы

const buttonProfileEdit = document.querySelector('.profile__edit-button'); 
const cardImages = document.querySelectorAll('.card__image'); 
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const buttonsPopupClose = document.querySelectorAll('.popup__close');
const popupAll = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTtitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//поиск DOM-элементов для функции создания новой карточки
export const formNewPlace = document.querySelector('form[name="new-place"]');
export const inputNewCardName = document.querySelector('.popup__input_type_card-name');
export const inputNewCardUrl = document.querySelector('.popup__input_type_url');

//поиск DOM-элементов для функции открытия картинки карточки в модальном окне

const popupCardImageType = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardImageCaption = document.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу

export const cardList = document.querySelector('.places__list');

initialCards.forEach(function (card) {
    const cardElement = createCard(card, deleteCard, likeCard, openCardImage);
    cardList.append(cardElement);
});

//функция редактирования данных профиля

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTtitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    const popupActive = evt.target.closest('.popup_is-opened');
    closeModal(popupActive);
  }

//функция открытия модального окна с картинкой карточки

export function openCardImage(evt) {
    evt.preventDefault();
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardImageCaption.textContent = evt.target.alt;
    openModal(popupCardImageType);
}

  //вешаем обработчик события "click" на кнопку открытия модального окна редактирования профиля

buttonProfileEdit.addEventListener('click', function(evt) {
    console.log(profileTtitle.textContent);
    evt.preventDefault();
    nameInput.value = profileTtitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupProfileEdit);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formEditProfile.addEventListener('submit', handleProfileFormSubmit); 

//вешаем обработчик клика на кнопку для открытия модального окна создания новой карточки

buttonProfileAdd.addEventListener('click', function(evt) {
    evt.preventDefault();
    openModal(popupNewCard);
});

//вешаем обработчик событий на форму создания новой карточки для отслеживания события "submit"

formNewPlace.addEventListener('submit', createNewCard);

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

    //добавляем класс с аниманией плавного открытия модальных окон
    
    item.classList.add('popup_is-animated');
});