import {openModal, closeModal, closeEscape} from './modal.js'
import {formNewPlace, inputNewCardName, inputNewCardUrl, cardList, openCardImage} from './index.js'
import {deleteCardFromServer, addLikeToCard, deleteLikeFromCard} from './api.js'

const isLiked = (card, currentUser) => {
    let isLiked = false;
    card.likes.forEach(function (element) {
        if (element._id === currentUser._id) {
            isLiked = true;
        };
    });
    return isLiked;
}

// @todo: Функция создания карточки

export function createCard (card, deleteCard, likeCard, openCardImage, currentUser) {
    
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
  
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__number-of-likes').textContent = card.likes.length;
    cardElement.setAttribute('cardID', card._id);
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', openCardImage);

    if (currentUser._id === card.owner._id) {
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('card__delete-button');
        cardElement.append(deleteButton);
        deleteButton.addEventListener('click', deleteCard);
    }

    if (isLiked(card, currentUser) === true) {
        likeButton.classList.add('card__like-button_is-active'); 
    }

    return cardElement;
  };
  
  // @todo: Функция удаления карточки
  
  export function deleteCard (event) {
    const cardListItem = event.target.closest('.places__item');
    const cardId = cardListItem.getAttribute('cardID');
    cardListItem.remove();
    deleteCardFromServer(cardId) 
  };
  
  //функция постановки/снятия лайка
  
  export function likeCard (event) {
    const cardListItem = event.target.closest('.places__item');
    const likedCardId = cardListItem.getAttribute('cardID');
    const likeButton = cardListItem.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active'); 
    
    if (likeButton.classList.contains('card__like-button_is-active')) {
        addLikeToCard(likedCardId)
        .then((data) => {
        cardListItem.querySelector('.card__number-of-likes').textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        deleteLikeFromCard(likedCardId)
        .then((data) => {
        cardListItem.querySelector('.card__number-of-likes').textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
