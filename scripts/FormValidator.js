export class FormValidator {
  constructor(validationConfig, forms) {
    this._validationConfig = validationConfig
    this._forms = forms
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError(inputElement, errorMessage) {
    const inputName = inputElement.getAttribute('name');
    const errorElement = this._forms.querySelector(`#${inputName}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const inputName = inputElement.getAttribute('name');
    const errorElement = this._forms.querySelector(`#${inputName}-error`)
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
    errorElement.classList.remove(this._validationConfig.errorClass)
    errorElement.textContent = ''
  }

  _setEventListeners() {
    const inputList = Array.from(this._forms.querySelectorAll(this._validationConfig.inputSelector))
    const buttonElement = this._forms.querySelector(this._validationConfig.submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  enableValidation() {
    const formList = Array.from(this._forms.querySelectorAll(this._validationConfig.formSelector))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault()
      })

      formList.forEach((formElement) => {
        setEventListeners(formElement)
      })
    })
    this._setEventListeners()
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true)
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
    } else {
      buttonElement.removeAttribute('disabled')
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass)
    }
  };

  removeValidationErrors() {
    const spanErrorList = Array.from(this._forms.querySelectorAll(this._validationConfig.errorSpan));
    spanErrorList.forEach((error) => {
      error.classList.remove(this._validationConfig.errorClass)
    })
    const errorList = Array.from(this._forms.querySelectorAll(this._validationConfig.inputSelector));
    errorList.forEach((error) => {
      error.classList.remove(this._validationConfig.inputErrorClass)
    })
  }
}
