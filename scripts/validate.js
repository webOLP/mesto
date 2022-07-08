
const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(`${params.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${params.errorClass}`);
  };
  
  const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(`${params.inputErrorClass}`);
    errorElement.classList.remove(`${params.errorClass}`);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
      hideInputError(formElement, inputElement, params);
    }
  };
  
  const setEventListeners = (formElement,params) => {
    const inputList = Array.from(formElement.querySelectorAll(`${params.inputSelector}`));
    const buttonElement = formElement.querySelector(`${params.submitButtonSelector}`);
    
    toggleButtonState(inputList, buttonElement, params);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, params);
        toggleButtonState(inputList, buttonElement, params);
      });
    });
  };
  
  const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(`${params.formSelector}`));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, params);
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const toggleButtonState = (inputList, buttonElement, params) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(`${params.inactiveButtonClass}`);
      buttonElement.setAttribute('disabled', 'true');
    } else {
      buttonElement.classList.remove(`${params.inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled');
    }
  }
  
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  })