import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector('#new-title');
    this._image = this._popup.querySelector('#new-link');
 }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._name.alt = name;
    super.open();
  }
}
