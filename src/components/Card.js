export class Card {
  constructor({ data, handleCardClick, likeClickCard, handleDeleteCardClick }, cardTemplateSelector, api, userId) {

      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._api = api;
      this._id = data._id;
      this._ownerId = data.owner._id;
      this._userId = userId;
      this._cardSelector = cardTemplateSelector;
      this._likeClickCard = likeClickCard;
      this._handleDeleteCardClick = handleDeleteCardClick;
      this._handleCardClick = handleCardClick;
      this._template = document.querySelector(this._cardSelector).content.querySelector('.element');
  }

  _getCardTemplate() {
    this._cardElement = this._template.cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.element__like');
    this._likeCount = this._cardElement.querySelector(".element__like-count");
  }

  renderCard() {
    this._getCardTemplate();
    this._cardImage = this._cardElement.querySelector('.element__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.element__text').textContent = this._name;

    this._likeCount.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".element__delete").style.display =
        "none";
    }

    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._likeButton.classList.add("element__like_active");
    }

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeClickCard();
    });

    this._cardElement
    .querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
  });

      this._cardImage
      .addEventListener("click", () => {
        this._handleCardClick({
          name: this._name,
          src: this._link,
        });
      });
  }

  handleLikeCard() {
    if (!this._likeButton.classList.contains("element__like_active")) {
      this._api
        .addLike(this._id)
        .then((data) => {
          this._likeButton.classList.add("element__like_active");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deleteLike(this._id)
        .then((data) => {
          this._likeButton.classList.remove("element__like_active");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _handleDeleteCard() {
    this._cardElement.closest(".element").remove();
  }

}



