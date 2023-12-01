import {openModal, closeModal, closeEscape} from './modal.js'
import {formNewPlace, inputNewCardName, inputNewCardUrl, cardList, openCardImage} from './index.js'

// @todo: Функция создания карточки

export function createCard (card, deleteCard, likeCard, openCardImage) {
    
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
  
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', openCardImage);
  
    return cardElement;
  };
  
  // @todo: Функция удаления карточки
  
  export function deleteCard (event) {
    const cardListItem = event.target.closest('.places__item');
    cardListItem.remove();
  };
  
  //функция постановки/снятия лайка
  
  export function likeCard (event) {
    const cardListItem = event.target.closest('.places__item');
    const likeButton = cardListItem.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active'); 
  };