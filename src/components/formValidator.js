export class FormValidator {
  constructor(form,
   params) {
    ///Передаваемые
    this._form = form;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
    ///Определяемые
    this._inputList = Array.from(this._form.querySelectorAll(`${this._inputSelector}`));
    this._buttonElement = this._form.querySelector(`${this._submitButtonSelector}`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}`);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError( inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    
    this._toggleButtonState();
    const that = this;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        that._checkInputValidity(inputElement);
        that._toggleButtonState();
      });
    });


  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
      this._buttonElement.setAttribute('disabled', 'true');
    } else {
      this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  clearErrors(){
    
    const that = this;
    this._inputList.forEach((inputElement) => {
      that._hideInputError(inputElement)
    });
    this._toggleButtonState();

  }

  enableValidation() {
      this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
    
  };

}