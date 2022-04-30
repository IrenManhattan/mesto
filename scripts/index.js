import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import { enableValidation, popupImageType, initialCards } from './constants.js';

export const cardTemplateSelector = '.card-template';

const editForm = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup__profile');
const profileExitButton = document.querySelector('#popup__exit_profile');
const imageExitButton = document.querySelector('#popup__exit_image');
const profile = document.querySelector('.profile');
const addCardButton = document.querySelector('.profile__add-button');
const nameProfile = profile.querySelector('.profile__name');
const profProfile = profile.querySelector('.profile__prof');
const nameInput = document.querySelector('#new-name');
const profInput = document.querySelector('#new-profession');
const profilePopupForm = document.querySelector('#profile_form');
const cardsExitButton = document.querySelector('#popup__exit_card');
const cardEditForm = document.querySelector('#card_form');
const inputCardTitle = document.querySelector('#new-title');
const inputCardLink = document.querySelector('#new-link');
const addPopupCard = document.querySelector('#popup__edit_card');
const imageCloseButton = popupImageType.querySelector('.popup__exit');
const profilePopupFormValidator = new FormValidator(enableValidation, profilePopupForm);
const cardEditFormValidator = new FormValidator(enableValidation, cardEditForm);
const cardList = document.querySelector('.elements');


profilePopupFormValidator.enableValidation();
cardEditFormValidator.enableValidation();


//Функция изменения имени и профессии в профиле
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  profProfile.textContent = profInput.value;

  closePopup(profilePopup);
}

//Функция добавления новой карточки
cardEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newElement = {
    name: inputCardTitle.value,
    link: inputCardLink.value
  }

  const cardElement = createNewCard(newElement)
  cardList.prepend(cardElement);

  closePopup(addPopupCard);

  evt.target.reset();
})

//Открываем форму редактирования профиля
editForm.addEventListener('click', () => {
  profilePopupFormValidator.resetValidation();
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  profInput.value = profProfile.textContent;
})

//Закрываем форму редактирования профиля
profileExitButton.addEventListener('click', () => {
  closePopup(profilePopup);
})

//Меняем имя и профессию в профиле
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

//Закрываем попап с картинкой
imageExitButton.addEventListener('click', () => {
  closePopup(popupImageType)
});

//Открываем форму добавления новой карточки
addCardButton.addEventListener('click', () => {
  cardEditFormValidator.resetValidation();
  openPopup(addPopupCard)
});

//Закрываем форму добавления новой карточки
cardsExitButton.addEventListener('click', () => closePopup(addPopupCard));

//Закрываем попап редактирования профиля кликом на оверлей
profilePopup.addEventListener('click', (evt) => {
  if(!evt.target.closest('.popup__container')) {
    closePopup(profilePopup)
  };
})

//Закрываем попап редактирования карточки кликом на оверлей
addPopupCard.addEventListener('click', (evt) => {
  if(!evt.target.closest('.popup__container')) {
    closePopup(addPopupCard)
  };
})

//Закрываем попап картинки кликом на оверлей
popupImageType.addEventListener('click', (evt) => {
  if(!evt.target.closest('.popup__image-container')) {
    closePopup(popupImageType)
  };
})

const createNewCard = (data) => {
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.createCard();
  return cardElement
}

//Добавляем новые карточки из массива
initialCards.forEach((item) => {
  const cardElement = createNewCard(item);
  cardList.prepend(cardElement)
})


