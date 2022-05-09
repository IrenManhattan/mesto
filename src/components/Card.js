export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardTemplateSelector;
      this._template = document.querySelector(this._cardSelector).content.querySelector('.element');
      this._handleCardClick = handleCardClick;
  }

  //Метод добавления лайка на карточке
  _handleLikeIcon = () => {
    this._likeButton.classList.toggle('element__like_active');
  };

  //Метод удаления карточки
  _handleDeleteCard = () => {
    this._cardElement.closest('.element').remove();
  };

  _setEventListeners = () => {
    //Удаляем карточку кликом по корзине
    this._deleteButton.addEventListener('click', this._handleDeleteCard);

    //Окрашиваем кнопку like в черный цвет при нажатии
    this._likeButton.addEventListener('click', this._handleLikeIcon);

    //Открываем попап с картинкой
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
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
