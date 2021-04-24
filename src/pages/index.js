import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { container, templateElement, editProfile, formProfElement,
  formPicElement, profileTitle, profileSubtitle, userNameInput,
  userProfessionInput, addPicture, subtitleSelector, nameSelector,
  popupProfileSelector, popupCardSelector, popupImageSelector,
  validationConfig, initialCards } from '../utils/constants.js'

const editProfileFormValidator = new FormValidator(validationConfig, formProfElement)
const addPicFormValidator = new FormValidator(validationConfig, formPicElement)

addPicFormValidator.enableValidation()
editProfileFormValidator.enableValidation()

const popupEditProfile = new PopupWithForm(popupProfileSelector, editProfileFormSubmitHandler);
const popupCardAdd = new PopupWithForm(popupCardSelector, addCardFormSubmitHandler);
const popupImageAdd = new PopupWithImage(popupImageSelector)
const userInfo = new UserInfo(nameSelector, subtitleSelector)

function editProfileFormSubmitHandler(data) {
  userInfo.setUserInfo(data)
  popupEditProfile.close()
}

function addCardFormSubmitHandler(data) {
  const cardElement = createCard({name: data['picture-titel'], link: data['picture-url']})
  container.prepend(cardElement)
  popupCardAdd.close()
}

export function handleCardClick(cardText, cardImage) {
  popupImageAdd.open(cardText, cardImage)
}

function createCard(data) {
  const card = new Card(data, templateElement, handleCardClick)
  return card.createDomNode()
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    cardsList.addItem(cardElement)
  },
},
container
)
cardsList.renderItems()

function fillEditProfileFields() {
  userNameInput.value = profileTitle.textContent
  userProfessionInput.value = profileSubtitle.textContent
}

editProfile.addEventListener('click', () => {
  fillEditProfileFields()
  editProfileFormValidator.removeValidationErrors()
  popupEditProfile.open()
})

addPicture.addEventListener('click', () => {
  formPicElement.reset()
  addPicFormValidator.removeValidationErrors()
  popupCardAdd.open()
})
