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
import { Api } from "../components/Api.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

let userId;
export const cardTemplateSelector = '.card-template';

//Попап подтверждения удаления
const popupConfirmation = new PopupWithConfirmation(popupEditConfirm, () => {});

popupConfirmation.setEventListeners();

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

const cardList = new Section( {
  renderer: item => {
    const card = createCard(item)
    const cardElement = card.renderCard()
    cardList.addItem(cardElement)
  } }, '.elements')

api.getAllData()
  .then(( [cards, userData] ) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.render(cards);
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

    likeClickCard: _ => card.handleLikeCard(),

    handleDeleteCardClick: () => {
      popupConfirmation.setConfirmHandler(() => {
        popupConfirmation.renderLoading(true, 'Удаление...')
        api.deleteCard(data._id)
          .then(() => {
            card.handleDeleteCard()
            popupConfirmation.close()
          })
          .catch((err) => console.log(err))
          .finally(() => {
            popupConfirmation.renderLoading(false);
      })
    })
    popupConfirmation.open(data);
  }
  },
  cardTemplateSelector,
  api,
  userId
  )
  return card
}

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
  avatarFormValidator.resetValidation()
  popupAvatarEdit.open()
})

const addCard = new PopupWithForm(addPopupCard, (data) => {
  addCard.renderLoading(true, 'Сохранение...');
  api.addUserCard(data)
  .then((data) => {
      const card = createCard(data)
      const cardElement = card.renderCard();
      cardList.addItem(cardElement);
      addCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addCard.renderLoading(false)

    })
});

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
