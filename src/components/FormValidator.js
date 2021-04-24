export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig
    this._form = form
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector))
    this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector)
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.getAttribute('name')}-error`)
    inputElement.classList.add(this._validationConfig.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._validationConfig.errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.getAttribute('name')}-error`)
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
    errorElement.classList.remove(this._validationConfig.errorClass)
    errorElement.textContent = ''
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute('disabled', true)
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass)
    } else {
      this._submitButton.removeAttribute('disabled')
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass)
    }
  }

  removeValidationErrors() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }
}
