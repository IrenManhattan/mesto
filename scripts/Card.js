import { openPopup } from './utils.js';
import { popupImageType, popupImage, imageTitle } from './constants.js';
import { cardTemplateSelector } from './index.js';

export class Card {

  constructor(data, cardTemplateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element');
  }

  //Метод добавления лайка на карточке
  _handleLikeIcon = () => {
    this._likeButton.classList.toggle('element__like_active');
  };

  //Метод удаления карточки
  _handleDeleteCard = () => {
    this._cardElement.closest('.element').remove();
  };

  //Метод открытия попапа с картинкой
  _handlePreviewPicture = () => {
    popupImage.src = this._link;
    imageTitle.textContent = this._name;
    popupImage.alt = this._name;
    openPopup(popupImageType)
  };

  _setEventListeners = () => {
    //Удаляем карточку кликом по корзине
    this._deleteButton.addEventListener('click', this._handleDeleteCard);

    //Окрашиваем кнопку like в черный цвет при нажатии
    this._likeButton.addEventListener('click', this._handleLikeIcon);

    //Открываем попап с картинкой
    this._cardImage.addEventListener('click', this._handlePreviewPicture);
}

  _fillCard = () => {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.element__text').textContent = this._name;
  }

  createCard = () => {
    this._cardElement = this._template.cloneNode(true);

    this._deleteButton = this._cardElement.querySelector('.element__delete');
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._cardImage = this._cardElement.querySelector('.element__photo');

    //Заполняем данные карточки
    this._fillCard()

    this._setEventListeners()

    return this._cardElement;
  };
}



