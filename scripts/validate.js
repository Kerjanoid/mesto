const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__error_visible'
}

//Объявляем функцию enableValidation
const enableValidation = ({formSelector, inputSelector}) => {
  const fromList = Array.from(document.querySelectorAll(formSelector));
  fromList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((input) => {
      setEventListeners(input);
    });
  });
}

//Объявляем функцию setEventListeners
const setEventListeners = ({formElement, inputSelector, submitButtonSelector}) => {
  const inputList = Array.from(document.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//Объявляем функцию hasInvalidInput - проверка наличия хотя бы одного невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Объявляем функцию toggleButtonState - изменение состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//Объявляем функцию showInputError - вывод сообщения об ошибке для невалидных полей
const showInputError = (formElement, inputElement, errorMessage) => {
  const inputName = input.getAttribute('name');
  const errorElement = formElement.querySelector(`${inputName}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Объявляем функцию hideInputError - удалениесообщения об ошибке для невалидных полей
const hideInputError = (formElement, inputElement) => {
  const inputName = input.getAttribute('name');
  const errorElement = formElement.querySelector(`${inputName}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Объявляем функцию checkInputValidity - проверка валидности полей ввода
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

enableValidation(formObject);

