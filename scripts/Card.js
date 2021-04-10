const popupViewPic = document.querySelector('.popup_view-picture')
const hugePic = document.querySelector('.popup__huge-picture')
const hugePicFigcap = document.querySelector('.popup__figcaption')

export class Card {
	constructor(data, cardSelector, openPopup) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
    this._openPopup = openPopup
	}

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return cardElement
  }

  createDomNode() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._elementPicture = this._element.querySelector('.element__img')
    this._elementPicture.src = this._link
    this._elementPicture.alt = this._name
    this._element.querySelector('.element__title').textContent = this._name

    return this._element
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like')
    this._deleteButton = this._element.querySelector('.element__trash-button')

    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('element__like_active')
    })

    this._deleteButton.addEventListener('click', () => {
      this._deleteButton.closest('.element').remove()
    })

    this._element.querySelector('.element__img').addEventListener('click', () => {
      hugePic.alt = this._name
      hugePicFigcap.textContent = this._name
      hugePic.src = this._link
      this._openPopup(popupViewPic)
    })
  }
}
