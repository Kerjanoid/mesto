import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input-field')
  }

	_getInputValues() {
		this._formValues = {}
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value
		})
		return this._formValues
	}

	_setEventListeners() {
		super._setEventListeners()
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
