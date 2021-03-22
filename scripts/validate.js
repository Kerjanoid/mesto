const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__error_visible'
}

//Объявляем функцию enableValidation
const enableValidation = (formObject) => {
  const fromList = Array.from(document.querySelectorAll(formObject.formSelector));
  fromList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    fromList.forEach((formElement) => {
      setEventListeners(formElement, formObject);
    });
  });
}

//Объявляем функцию setEventListeners
const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, formObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

//Объявляем функцию hasInvalidInput - проверка наличия хотя бы одного невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Объявляем функцию toggleButtonState - изменение состояния кнопки
const toggleButtonState = (inputList, buttonElement, formObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(formObject.inactiveButtonClass);
  }
};

//Объявляем функцию showInputError - вывод сообщения об ошибке для невалидных полей
const showInputError = (formElement, inputElement, errorMessage, formObject) => {
  const inputName = inputElement.getAttribute('name');
  const errorElement = formElement.querySelector(`#${inputName}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.errorClass);
};

//Объявляем функцию hideInputError - удалениесообщения об ошибке для невалидных полей
const hideInputError = (formElement, inputElement, formObject) => {
  const inputName = inputElement.getAttribute('name');
  const errorElement = formElement.querySelector(`#${inputName}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

//Объявляем функцию checkInputValidity - проверка валидности полей ввода
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};

enableValidation(formObject);

