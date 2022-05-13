import logo from "../images/logo.svg";
import rofile_avatar from "../images/profile_avatar.jpg"

const images = [
  { name: 'logo', link: logo },
  { name: 'rofile_avatar', link: rofile_avatar },
];


import './index.css';
import { FormValidator } from '../components/FormValidator.js'
import {
  enableValidation,
  popupImageType,
  initialCards,
  addPopupCard,
  profilePopup,
  editForm,
  addCardButton,
  profilePopupForm,
  cardEditForm,
  nameElementSelector ,
  infoElementSelector,
  nameInput,
  profInput,
  editAvatarForm,
  deleteConfirmForm,
  avatarElementSelector,
  popupEditConfirm,
  avatarPopup,
  avatarEditButton
} from '../utils/constants.js'

import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from "../components/Api";
import PopupWithConfirmation from '../components/PopupWithConfirmation';

let userId;
export const cardTemplateSelector = '.card-template';

//Попап подтверждения удаления
const popupConfirmation = new PopupWithConfirmation(popupEditConfirm);

//Попап редактирования профиля
const userInfo = new UserInfo({ nameElementSelector, infoElementSelector, avatarElementSelector });

//Попап открытия картинки
const openImagePopup = new PopupWithImage(popupImageType);

const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
   headers: {
      authorization: '04a52fd8-c918-402a-8ff4-eae6c3d18187',
      'Content-Type': 'application/json'
   }
})

//Запрос данных профиля с сервера
const getUserInfo = api.getProfile()

//Запрос данных карточек с сервера
const getCards = api.getInitialCards()

api.getAllData()
  .then(( [cards, userData] ) => {
    userInfo.setUserInfo(userData)
    userId = userData._id

    cardList.setItems(cards)
  })
  .catch((err) => console.log(err))

const profilePopupFormValidator = new FormValidator(enableValidation, profilePopupForm);
const cardEditFormValidator = new FormValidator(enableValidation, cardEditForm);
const avatarFormValidator = new FormValidator(enableValidation, editAvatarForm);

//Запуск валидации форм
profilePopupFormValidator.enableValidation();
cardEditFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//Навешиваем слушатели на попап с картинкой
openImagePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card
  (
  {
    data: data,

    handleCardClick: _ => openImagePopup.open(data),

    handleLikeClick: _ => card.handleLikeCard(),

    handleDeleteCardClick: _ => {
      popupConfirmation.setSubmitAction( _ => {
        popupConfirmation.renderLoading(true)
        api.delete(data._id)
          .then( _ => {
            card._handleDeleteCard()
            popupConfirmation.close()
          })
          .catch((err) => console.log(err))
          .finally( _ => popupConfirmation.renderLoading(false))
      })
      popupConfirmation.open()
    }
  },
  cardSelector,
  api,
  userId
  )
  return card
}

  const cardList = new Section( {
    renderer: item => {
      const card = createCard(item)
      const cardElement = card.createCard()
      cardList.addItem(cardElement)
    } }, 'elements')

const popupAvatarEdit = new PopupWithForm(avatarPopup, newValues => {
  popupAvatarEdit.renderLoading(true)
    api.editAvatar(newValues)
        .then((data) => {
          userInfo.setAvatar(data)
          popupAvatarEdit.close()
        })
        .catch((err) => console.log(err))
        .finally( _ => popupAvatarEdit.renderLoading(false))
    })
popupAvatarEdit.setEventListeners()

avatarEditButton.addEventListener('click', _ => {
  avatarFormValidator.disableSubmitButton()
  avatarFormValidator.resetValidation()
  popupAvatarEdit.open()
})

const addCard = new PopupWithForm(addPopupCard, newValues => {
  addCard.renderLoading(true)
  api.addUserCard(newValues)
    .then((data) => {
      const card = createCard(data)
      const cardElement = card.setItems()
      cardList.addItem(cardElement)
      addCard.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => addCard.renderLoading(false))
})

addCard.setEventListeners()

const newProfileForm = new PopupWithForm(profilePopup, newValues => {
  newProfileForm.renderLoading(true)
  api.editProfile(newValues)
    .then((data) => {
      userInfo.setUserInfo(data)
      newProfileForm.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => newProfileForm.renderLoading(false))
})
newProfileForm.setEventListeners()


addCardButton.addEventListener('click', _ => {
  cardEditFormValidator.disableSubmitButton()
  cardEditFormValidator.resetValidation();
  addCard.open()
})

editForm.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()

  profilePopupFormValidator.resetValidation();

  nameInput.value = userData.name;
  profInput.value = userData.bio;

  profilePopupFormValidator.enableSubmitButton()

  newProfileForm.open()
})









// //Переменная,отвечающая за отправку данных в карточке редактирования профиля
// const newProfileForm = new PopupWithForm(profilePopup, {
//   handleSubmitForm: (item) => {
//     userInfo.setUserInfo(item);
//   },
// });

// newProfileForm.setEventListeners();

// //Слушатель формы редактирования профиля
// editForm.addEventListener("click", () => {
//   const { name, bio } = userInfo.getUserInfo();
//   nameInput.value = name;
//   profInput.value = bio;
//   newProfileForm.open();
//   profilePopupFormValidator.resetValidation();
// });

// cardList.setItems();



// const profilePopupFormValidator = new FormValidator(enableValidation, profilePopupForm);
// const cardEditFormValidator = new FormValidator(enableValidation, cardEditForm);
// const avatarFormValidator = new FormValidator(enableValidation, editAvatarForm);

// //Запуск валидации форм
// profilePopupFormValidator.enableValidation();
// cardEditFormValidator.enableValidation();
// avatarFormValidator.enableValidation();

// profilePopupFormValidator.resetValidation();



// //Функция открытия попапа с картинкой при клике на карточку
// function handleCardClick(name, link) {
//   openImagePopup.open(name, link)
// }

// //Навешиваем слушатели на попап с картинкой
// openImagePopup.setEventListeners();


// const createNewCard = (data) => {
//   const card = new Card(data, cardTemplateSelector, handleCardClick);
//   const cardElement = card.createCard();
//   return cardElement
// }

// //Переменная, которая отвечает за отрисовку элементов на странице
// const cardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const newCard = createNewCard(item);
//     cardList.addItem(newCard);
//   },
// }, '.elements');

// //Переменная, отвечающая за отпраку данных в форме редактирования карточки
// const addCard = new PopupWithForm
// (addPopupCard, {
//   handleSubmitForm: (formValue) => {
//     const newCard = createNewCard(formValue);
//     cardList.addItem(newCard);
//   }
// });



// addCard.setEventListeners();

// addCardButton.addEventListener('click', () => {
//   addCard.open();
//   cardEditFormValidator.resetValidation();
// });





