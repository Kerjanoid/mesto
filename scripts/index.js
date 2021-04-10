import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {initialCards} from './initial-cards.js'

const container = document.querySelector('.elements')
const templateElement = '.template';
const editProfile = document.querySelector('.profile__edit-button')
const popupProfile = document.querySelector('.popup_edit-profile')
const popupNewPic = document.querySelector('.popup_new-picture')
const closeButtonList = document.querySelectorAll('.popup__close-button')
const formProfElement = document.querySelector('.popup__form_edit-profile')
const formPicElement = document.querySelector('.popup__form_new-picture')
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const userNameInput = document.querySelector('.popup__input-field_type_titel')
const userProfessionInput = document.querySelector('.popup__input-field_type_subtitel')
const inputFieldPicTitel = document.querySelector('.popup__input-field_type_pic-titel')
const inputFieldPicLink = document.querySelector('.popup__input-field_type_pic-link')
const addPicture = document.querySelector('.profile__add-button')


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__save-button',
  errorSpan: '.popup__error',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__error_visible'
}

const editProfileFormValidator = new FormValidator(validationConfig, formProfElement);
const addPicFormValidator = new FormValidator(validationConfig, formPicElement);

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', keyHandler)
  clickCloserEnable()
}

// Функция заполнения полей ввода значениями со страницы
function fillEditProfileFields() {
  userNameInput.value = profileTitle.textContent;
  userProfessionInput.value = profileSubtitle.textContent;
}

editProfile.addEventListener('click', () => {
  fillEditProfileFields()
  editProfileFormValidator.enableValidation()
  editProfileFormValidator.removeValidationErrors()
  openPopup(popupProfile)
})

addPicture.addEventListener('click', () => {
  addPicFormValidator.enableValidation()
  addPicFormValidator.removeValidationErrors()
  formPicElement.reset()
  openPopup(popupNewPic)
})

function closePopup(popup) {
  clickCloserDisable();
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

//Закрытие попапа по крестику
closeButtonList.forEach((button) => button.addEventListener('click', (event) => {
  const target = event.target
  const openedPopup = target.closest('.popup_opened')
  closePopup(openedPopup)
}))

//Внесение изменений в профиле
function changeProfile(event) {
  event.preventDefault()
  profileTitle.textContent = userNameInput.value
  profileSubtitle.textContent = userProfessionInput.value
  closePopup(popupProfile)
}

formProfElement.addEventListener('submit', changeProfile)

//Рендер карточек "из коробки"
initialCards.forEach((data) => {
  const newCard = createCard(data)
  container.append(newCard)
});

//Функция создания карточек
function createCard(data) {
  const card = new Card(data, templateElement, openPopup)
  const cardElement = card.createDomNode()
  return cardElement
}

//Добавление карточек
function addCard (event) {
  event.preventDefault()
  const newCard = createCard({name: inputFieldPicTitel.value, link: inputFieldPicLink.value})
  container.prepend(newCard)
  closePopup(popupNewPic)
}

formPicElement.addEventListener('submit', addCard)

//Функция закрытия на ESC
const keyHandler = (event) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

//Функция закрытия попапа при клике вне формы + listener
function clickCloserEnable() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.addEventListener('click', () => closePopup(openedPopup));
  openedPopup.querySelector('.stop-propagation').addEventListener('click', function(event) {
    event.stopPropagation();
  });
}

//Функция отключения listener clickCloser
function clickCloserDisable() {
  const openedPopup = document.querySelector('.popup_opened');
  document.removeEventListener('click', () => closePopup(openedPopup));
}
