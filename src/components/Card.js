export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteCardClick, likeClickCard) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data._id;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._cardSelector = cardTemplateSelector;
      this._template = document.querySelector(this._cardSelector).content.querySelector('.element');
      this._likeClickCard = likeClickCard;
      this._handleDeleteCardClick = handleDeleteCardClick;
      this._handleCardClick = handleCardClick;
  }

  //Метод удаления лайка на карточке
  _removeLike = () => {
    this._likeButton.classList.remove('element__like_active');
  };

  //Метод добавления лайка на карточке
  _addLike() {
    this._likeButton.classList.add('element__like_active');
}

  //Метод удаления карточки
  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners = () => {
    //Удаляем карточку кликом по корзине
    this._deleteButton.addEventListener('click', this._handleDeleteCardClick(this._id));

    //Окрашиваем кнопку like в черный цвет при нажатии
    this._likeButton.addEventListener('click', this._handleLikeClick(this._id));

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

  isLiked() {
    const isUserHasLikes = this._likes.find(user => user._id === this._userId);
    return isUserHasLikes;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement.textContent = this._likes.length;
    if(this.isLiked()) {
        this._addLike()
    } else {
        this._removeLike()
    }
  }

  createCard = () => {
    this._cardElement = this._template.cloneNode(true);

    this._deleteButton = this._cardElement.querySelector('.element__delete');
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._cardImage = this._cardElement.querySelector('.element__photo');

    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
  }

    //Проставляем лайки
    this.setLikes(this._likes);

    //Заполняем данные карточки
    this._fillCard()

    this._setEventListeners()

    return this._cardElement;
  };
}


