let editForm= document.querySelector('.profile__container_edit-button');
let container = document.querySelector('.popup');
let exitButton = container.querySelector('.popup__exit');
let profile = document.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__container_info-name');
let profProfile = profile.querySelector('.profile__container_info-prof');
let nameForm = container.querySelector('#new-name');
let profForm = container.querySelector('#new-profession');
let formSave = container.querySelector('.popup__button');

editForm.addEventListener('click', function openPopup() {
  container.classList.add('popup_opened');
  nameForm.placeholder=nameProfile.textContent;
  profForm.placeholder=profProfile.textContent;
});

exitButton.addEventListener('click', function closePopup() {
  container.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameForm.value;
  profProfile.textContent = profForm.value;

  container.classList.remove('popup_opened');
}

formSave.addEventListener('click', formSubmitHandler);











