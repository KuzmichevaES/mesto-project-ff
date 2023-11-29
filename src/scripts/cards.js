import {openModal, closeModal, closeEscape, openCardImage} from './modal.js'

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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

//функция создания новой карточки

export function createNewCard(evt) {
  evt.preventDefault(); 
  const newCard = {};
  const formNewPlace = document.querySelector('form[name="new-place"]');
  const newCardName = document.querySelector('.popup__input_type_card-name');
  const newCardPicture = document.querySelector('.popup__input_type_url');
  newCard.link = newCardPicture.value;
  newCard.name = newCardName.value;
  const cardElement = createCard(newCard, deleteCard, likeCard, openCardImage);
  const cardList = document.querySelector('.places__list');
  cardList.prepend(cardElement);
  closeModal();
  formNewPlace.reset();
};

//функция редактирования данных профиля

export function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const profileTtitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  profileTtitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

//функция постановки/снятия лайка

export function likeCard (event) {
  const cardListItem = event.target.closest('.places__item');
  const likeButton = cardListItem.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')) {
      likeButton.classList.remove('card__like-button_is-active');
  } else {
      likeButton.classList.add('card__like-button_is-active');
  };
};