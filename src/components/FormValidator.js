export class FormValidator {
  constructor (settings, form) {
      this._form = form;
      this._settings = settings;
      this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
      this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  //Функция, которая добавляет класс с ошибкой
  _showError = (input, errorMessage) => {
    const {errorClass, inputErrorClass} = this._settings

    const errorElement = this._form.querySelector(`#error-${input.id}`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  //Функция, которая удаляет класс с ошибкой
  _hideError = (input) => {
    const {errorClass, inputErrorClass} = this._settings

    const errorElement = this._form.querySelector(`#error-${input.id}`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (input) => {
    if(input.validity.valid) {
        this._hideError(input);
    } else {
        this._showError(input, input.validationMessage);
    }
}

  _isFormValid() {
    return this._inputList.some((input) => {
        return !input.validity.valid;
    });
};

  _disableSubmitButton = () => {
      const { inactiveButtonClass } = this._settings;
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
  }

  enableSubmitButton = () => {
      const { inactiveButtonClass } = this._settings;
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
  }

  resetValidation() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      this._hideError(input)
    });
  }

  _toggleButton = () => {
      if (this._isFormValid()) {
          this._disableSubmitButton();
      } else {
          this.enableSubmitButton();
      }
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
};


enableValidation () {
  this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
       this._setEventListeners();
  }
}


