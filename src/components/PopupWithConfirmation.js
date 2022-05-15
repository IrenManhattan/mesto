import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitCallBack) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')

    this._popupButton = this._popupForm.querySelector('.popup__button')
    this._defaultText = this._popupButton.textContent
    this._handleSubmitCallback = handleSubmitCallBack;
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
  }

  setConfirmHandler(handleSubmitCallBack) {
    this._handleSubmitCallback = handleSubmitCallBack;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Удаление...'
    } else {
      this._popupButton.textContent = this._defaultText
    }
  }
}
