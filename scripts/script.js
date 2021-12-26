let editForm= document.querySelector('.profile__edit-button');
let container = document.querySelector('.popup');
let exitButton = container.querySelector('.popup__exit');
let profile = document.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__name');
let profProfile = profile.querySelector('.profile__prof');
let nameForm = container.querySelector('#new-name');
let profForm = container.querySelector('#new-profession');
let popupForm = container.querySelector('#profile_form');

function openPopup() {
  container.classList.add('popup_opened');
  nameForm.value=nameProfile.textContent;
  profForm.value=profProfile.textContent;
}

editForm.addEventListener('click', openPopup);

function closePopup() {
  container.classList.remove('popup_opened');
}

exitButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameForm.value;
  profProfile.textContent = profForm.value;

  closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);











