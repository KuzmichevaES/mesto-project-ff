import {cardTemplate} from './index.js'
import {deleteCardFromServer, addLikeToCard, deleteLikeFromCard} from './api.js'

const isLiked = (card, currentUser) => {
    return card.likes.some((like) => like._id === currentUser._id);
}

// @todo: Функция создания карточки

export function createCard (card, deleteCard, likeCard, openCardImage, currentUser) {
  
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCounter = cardElement.querySelector('.card__number-of-likes');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    likeCounter.textContent = card.likes.length;
    likeButton.addEventListener('click',() => likeCard (card._id, likeButton, likeCounter));
    cardImage.addEventListener('click', (evt) => openCardImage(evt, card));

    if (currentUser._id != card.owner._id) {
        deleteButton.remove(); 
    } else {
        deleteButton.addEventListener('click', () => deleteCard(cardElement, card._id));
    }

    if (isLiked(card, currentUser) === true) {
        likeButton.classList.add('card__like-button_is-active'); 
    }

    return cardElement;
  };
  
  // @todo: Функция удаления карточки
  
export function deleteCard (cardListItem, cardId) {
    deleteCardFromServer(cardId)
    .then((data) => {
        cardListItem.remove();
    })
    .catch((err) => {
        console.log(err);
    })
};
  
  //функция постановки/снятия лайка
  
export function likeCard (likedCardId, likeButton, likeCounter) {
    
    if (likeButton.classList.contains('card__like-button_is-active')) {
        deleteLikeFromCard(likedCardId)
        .then((data) => {
            likeButton.classList.toggle('card__like-button_is-active'); 
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        addLikeToCard(likedCardId)
        .then((data) => {
            likeButton.classList.toggle('card__like-button_is-active'); 
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
