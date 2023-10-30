// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

function addCards (card, deleteCard) {
    
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard (event) {
    const cardListItem = event.target.closest('.places__item');
    cardListItem.remove();
};

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

initialCards.forEach(function (card) {
    let cardElement = addCards(card, deleteCard);
    cardList.append(cardElement);
});