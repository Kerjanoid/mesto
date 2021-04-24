export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector)
    }

    open() {
      this.setEventListeners()
      this._popup.classList.add('popup_opened')
    }

    close() {
      this.removeEventListeners()
      this._popup.classList.remove('popup_opened')
    }

    _handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close()
      }
    }

    _handleClickCloser = (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button-img')) {
        this.close()
      }
    }

    setEventListeners() {
      this._popup.addEventListener('click', this._handleClickCloser)
      document.addEventListener('keydown', this._handleEscClose)
      }

    removeEventListeners() {
      this._popup.removeEventListener('click', this._handleClickCloser)
      document.removeEventListener('keydown', this._handleEscClose)
    }
  }
