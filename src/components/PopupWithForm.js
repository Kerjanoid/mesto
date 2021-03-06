import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._inactiveButtonClass = 'popup__submit-button_disabled'
    this._handleSubmitForm = handleSubmitForm
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input-field')
    this._submitButton = this._form.querySelector('.popup__submit-button')
  }

  setSubmitButtonText(buttonText) {
    this._submitButton.textContent = buttonText
  }

  setSubmitButtonAttribute() {
    this._submitButton.setAttribute('disabled', true)
    this._submitButton.classList.add(this._inactiveButtonClass)
  }

  setSubmitCallback(callback) {
    this._handleSubmitForm = callback
  }

	_getInputValues() {
		this._formValues = {}
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value
		})
		return this._formValues
	}

	setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', this._submitHandler)
	}

  _submitHandler = (event) => {
    event.preventDefault()
		this._handleSubmitForm(this._getInputValues())
  }

  close() {
		super.close()
		this._form.reset()
    this._form.removeEventListener('submit', this._submitHandler)
	}
}
