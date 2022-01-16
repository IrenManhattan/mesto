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
const prifilePopupForm = document.querySelector('#profile_form');
const cardsList = document.querySelector('.elements');
const cardsExitButton = document.querySelector('#popup__exit_card');
const cardEditForm = document.querySelector('#card_form');
const inputCardTitle = document.querySelector('#new-title');
const inputCardLink = document.querySelector('#new-link');
const popupImageType = document.querySelector('#popup__image');
const popupImage = document.querySelector('.popup__image');
const addPopupCard = document.querySelector('#popup__edit_card');
const imageTitle = document.querySelector('.popup__image-title');
const imageCloseButton = popupImageType.querySelector('.popup__exit');
const cardTemplate = document.querySelector('.card-template').content;
const cardImage = document.querySelectorAll('.element__photo');
const initialCards = [
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

//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Открываем форму редактирования профиля
editForm.addEventListener('click', () => {
  openPopup(profilePopup)
  nameInput.value=nameProfile.textContent;
  profInput.value=profProfile.textContent;
})


//Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Закрываем форму редактирования профиля
profileExitButton.addEventListener('click', () => {
  closePopup(profilePopup)
})

//Функция изменения имени и профессии в профиле
function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  profProfile.textContent = profInput.value;

  closePopup(profilePopup);
}

//Меняем имя и профессию в профиле
prifilePopupForm.addEventListener('submit', profileFormSubmitHandler);



//Функция удаления карточки
function deleteHandler (evt) {
  evt.target.closest('.element').remove();
}

//Функция создания карточек и управления их элементами
function createCard (item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__photo');
  const cardTitle = cardElement.querySelector('.element__text');
  const deleteButton = cardElement.querySelector('.element__delete');
  const likeButton = cardElement.querySelector('.element__like');

  cardImage.src = item.link
  cardTitle.textContent = item.name
  cardImage.alt = cardTitle.textContent

//Открываем попап с картинкой
cardImage.addEventListener('click', () => {
  openPopup(popupImageType)
  popupImage.src = item.link
  imageTitle.textContent = item.name
  popupImage.alt = cardTitle.textContent
});

//Удаляем карточку кликом по корзине
deleteButton.addEventListener('click', deleteHandler);

//Окрашиваем кнопку like в черный цвет при нажатии
likeButton.addEventListener('click', () => {
  likeButton.classList.toggle('element__like_active')
  });
return cardElement;
}

function createNewCard (cardData) {
  const cardElement = createCard(cardData)
  cardsList.prepend(cardElement);
}

//Добавляем новые карточки из массива
initialCards.forEach(createNewCard);

//Закрываем попап с картинкой
imageExitButton.addEventListener('click', () => {
  closePopup(popupImageType)
});

//Функция добавления новой карточки
cardEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = inputCardTitle.value;
  const linkValue = inputCardLink.value;
  const newElement = {name: nameValue, link: linkValue};
  createNewCard(newElement);
  cardEditForm.reset();
  closePopup(addPopupCard);
})

//Открываем форму добавления новой карточки
addCardButton.addEventListener('click', () => openPopup(addPopupCard));

//Закрываем форму добавления новой карточки
cardsExitButton.addEventListener('click', () => closePopup(addPopupCard));
