import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')

    this._popupButton = this._popupForm.querySelector('.popup__button')
    this._defaultText = this._popupButton.textContent
    this._handleSubmitCallback = null;
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Удаление...'
    } else {
      this._popupButton.textContent = this._defaultText
    }
  }
}
