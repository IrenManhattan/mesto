//Функция закрытия popup нажатием на кнопку Escape
export function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup (document.querySelector('.popup_opened'));
  };
}

//Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}
