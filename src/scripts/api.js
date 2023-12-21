import { profileTitle, profileDescription, profileImage } from "./index.js";

//обращение к серверу

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
        authorization: 'c6822e76-741a-4299-92d5-816e7931a995',
        'Content-Type': 'application/json'
        }
}

//функция проверки ответа сервера

const getResponseData = (res) => {
    if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      };
}

//функция получения данных о пользователе

export const getCurrentUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
};

//функция получения всех карточек с сервера

export const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
    })
    .then((res) => {
      return getResponseData(res);
    })
};

//функция для изменения данных профиля

export const updateUserData = (newData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
        name: newData.name,
        about: newData.about
        })
    })
    .then((res) => {
        return getResponseData(res);
      })
};

//функция передачи данных о новой карточке на сервер

export const loadNewCardData = (fetchData) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers, 
      body: JSON.stringify({
          name: fetchData.name,
          link: fetchData.link
          })
    })
    .then((res) => {
        return getResponseData(res);
    })
};

//удаляем карточку с сервера

export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
};

//ставим лайк на карточку

export const addLikeToCard = (likedCardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${likedCardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
};

//удаляем лайк с карточки

export const deleteLikeFromCard = (likedCardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${likedCardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
};

//обновляем аватар профиля

export const updateUserAvatar = (newData) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers, 
      body: JSON.stringify({
          avatar: newData.avatar
          })
      })
      .then((res) => {
          return getResponseData(res);
        })
  };