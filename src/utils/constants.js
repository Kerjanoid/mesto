export const templateElement = document.querySelector('.template')
export const nameSelector = '.profile__title'
export const subtitleSelector = '.profile__subtitle'
export const avatarSelector = '.avatar'
export const popupProfileSelector = '.popup_edit-profile'
export const popupCardSelector = '.popup_new-picture'
export const popupImageSelector = '.popup_view-picture'
export const popupAvatarSelector = '.popup_edit-avatar'
export const popupDeleteAgreementSelector = '.popup_delete-agreement'
export const containerSelector = '.elements'
export const container = document.querySelector('.elements')
export const editProfile = document.querySelector('.profile__edit-button')
export const editAvatar = document.querySelector('.avatar__edit-button-img')
export const formProfElement = document.querySelector('.popup__form_edit-profile')
export const formPicElement = document.querySelector('.popup__form_new-picture')
export const formAvatarElement = document.querySelector('.popup__form_edit-avatar')
export const profileTitle = document.querySelector('.profile__title')
export const profileSubtitle = document.querySelector('.profile__subtitle')
export const userNameInput = document.querySelector('.popup__input-field_type_titel')
export const userProfessionInput = document.querySelector('.popup__input-field_type_subtitel')
export const addPicture = document.querySelector('.profile__add-button')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-button',
  errorSpan: '.popup__error',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__error_visible'
}

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

