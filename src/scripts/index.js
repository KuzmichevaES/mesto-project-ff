import {initialCards} from './cards.js';
import '../pages/index.css';
import {openModal, closeModal, closeEscape, openCardImage} from './modal.js'
import {createCard, deleteCard, createNewCard, handleFormSubmit, likeCard} from './cards.js'

// @todo: DOM узлы

const buttonEdit = document.querySelector('.profile__edit-button'); 
const cardImage = document.querySelectorAll('.card__image'); 
const addButton = document.querySelector('.profile__add-button');
const profileEdit = document.querySelector('.popup_type_edit');
const newCard = document.querySelector('.popup_type_new-card'); 
const buttonsClose = document.querySelectorAll('.popup__close');
const popupAll = document.querySelectorAll('.popup');
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTtitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.querySelector('form[name="new-place"]');
const likeButtonAll = document.querySelectorAll('.card__like-button');

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

initialCards.forEach(function (card) {
    const cardElement = createCard(card, deleteCard, likeCard, openCardImage);
    cardList.append(cardElement);
});

//вешаем обработчик события "click" на кнопку открытия модального окна редактирования профиля

buttonEdit.addEventListener('click', function(evt) {
    console.log(profileTtitle.textContent);
    evt.preventDefault();
    nameInput.value = profileTtitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profileEdit);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', handleFormSubmit); 

//вешаем обработчик события "click" на все картинки для возможности открытия модального окна с картинкой карточки

cardImage.forEach(function(item) {
    item.addEventListener('click', openCardImage);
});

//вешаем обработчик клика на кнопку для открытия модального окна создания новой карточки

addButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    openModal(newCard);
});

//вешаем обработчик событий на форму создания новой карточки для отслеживания события "submit"

formNewPlace.addEventListener('submit', createNewCard);


//вешаем обработчик клика на кнопку закрытия модального окна

buttonsClose.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        closeModal();
    });
});

//вешаем обработчик события "click" для проверки класса открытого попапа и добавляем класс с аниманией плавного открытия модальных окон

popupAll.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal();
        };
    });
    item.classList.add('popup_is-animated');
});

//вешаем обработчик на кнопку постановки/снятия лайка

likeButtonAll.forEach(function(item) {
    item.addEventListener('click', likeCard);
})
