import logo from "../images/logo.svg";
import rofile_avatar from "../images/profile_avatar.jpg"

const images = [
  { name: 'logo', link: logo },
  { name: 'rofile_avatar', link: rofile_avatar },
];


import './index.css';
import { FormValidator } from '../components/FormValidator.js'
import { enableValidation, popupImageType, initialCards, addPopupCard, profilePopup, imageTitle, popupImage } from '../components/utils/constants.js'
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

export const cardTemplateSelector = '.card-template';

const editForm = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profilePopupForm = document.querySelector('#profile_form');
const cardEditForm = document.querySelector('#card_form');

const profilePopupFormValidator = new FormValidator(enableValidation, profilePopupForm);
const cardEditFormValidator = new FormValidator(enableValidation, cardEditForm);

//Запуск валидации форм
profilePopupFormValidator.enableValidation();
cardEditFormValidator.enableValidation();

const openImagePopup = new PopupWithImage(popupImageType);

//Функция открытия попапа с картинкой при клике на карточку
function handleCardClick(name, link) {
  openImagePopup.open(name, link)
}

//Навешиваем слушатели на попап с картинкой
openImagePopup.setEventListeners();


const createNewCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const cardElement = card.createCard();
  return cardElement
}

//Переменная, которая отвечает за отрисовку элементов на странице
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createNewCard(item);
    cardList.addItem(newCard);
  },
}, '.elements');

//Переменная, отвечающая за отпраку данных в форме редактирования карточки
const addCard = new PopupWithForm(addPopupCard, {
  handleSubmitForm: (formValue) => {
    const newCard = createNewCard(formValue);
    cardList.addItem(newCard);
  }
});

addCard.setEventListeners();

addCardButton.addEventListener('click', () => {
  addCard.open();
  cardEditFormValidator.resetValidation();
});

const nameElementSelector = '.profile__name';
const infoElementSelector = '.profile__prof';
const nameInput = document.querySelector('#new-name');
const profInput = document.querySelector('#new-profession');

const userInfo = new UserInfo({ nameElementSelector, infoElementSelector });

//Переменная,отвечающая за отправку данных в карточке редактирования профиля
const newProfileForm = new PopupWithForm(profilePopup, {
  handleSubmitForm: (item) => {
    userInfo.setUserInfo(item);
  },
});

newProfileForm.setEventListeners();

//Слушатель формы редактирования профиля
editForm.addEventListener("click", () => {
  const { name, bio } = userInfo.getUserInfo();
  nameInput.value = name;
  profInput.value = bio;
  newProfileForm.open();
  profilePopupFormValidator.resetValidation();
});

cardList.setItems();



