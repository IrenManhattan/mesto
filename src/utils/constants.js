

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible',
  errorSelector: '.error-message'
};

export const popupImageType = document.querySelector('#popup__image');
export const popupImage = document.querySelector('.popup__image');
export const imageTitle = document.querySelector('.popup__image-title');

export const addPopupCard = document.querySelector('#popup__edit_card');
export const profilePopup = document.querySelector('#popup__profile');

export const editForm = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const profilePopupForm = document.querySelector('#profile_form');
export const cardEditForm = document.querySelector('#card_form');


export const nameElementSelector = '.profile__name';
export const infoElementSelector = '.profile__prof';
export const nameInput = document.querySelector('#new-name');
export const profInput = document.querySelector('#new-profession');
