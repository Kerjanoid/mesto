import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { container, containerSelector, templateElement, editProfile, editAvatar, formProfElement,
  formPicElement, formAvatarElement, profileTitle, profileSubtitle, userNameInput,
  userProfessionInput, addPicture, subtitleSelector, nameSelector, avatarSelector,
  popupProfileSelector, popupCardSelector, popupImageSelector, popupAvatarSelector,
  popupDeleteAgreementSelector, validationConfig, initialCards } from '../utils/constants.js'

const editProfileFormValidator = new FormValidator(validationConfig, formProfElement)
const addPicFormValidator = new FormValidator(validationConfig, formPicElement)
const avatarFormValidatior = new FormValidator(validationConfig, formAvatarElement)

addPicFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
avatarFormValidatior.enableValidation()

const popupEditProfile = new PopupWithForm(popupProfileSelector, editProfileFormSubmitHandler)
const popupCardAdd = new PopupWithForm(popupCardSelector, addCardFormSubmitHandler)
const popupEditAvatar = new PopupWithForm(popupAvatarSelector, editAvatarFormSubmitHandler)
const popupWithImage = new PopupWithImage(popupImageSelector)
const confirmPopup = new PopupWithForm(popupDeleteAgreementSelector, editAvatarFormSubmitHandler)

const userInfo = new UserInfo(nameSelector, subtitleSelector, avatarSelector)

editProfile.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo()
  userNameInput.value = profileData.userName
  userProfessionInput.value = profileData.userProfession
  editProfileFormValidator.removeValidationErrors()
  popupEditProfile.open()
})

addPicture.addEventListener('click', () => {
  formPicElement.reset()
  addPicFormValidator.removeValidationErrors()
  popupCardAdd.open()
})

editAvatar.addEventListener('click', () => {
  formAvatarElement.reset()
  avatarFormValidatior.removeValidationErrors()
  popupEditAvatar.open()
})

const toggleLoading = (popup, isLoaded) => {
  if (isLoaded) {
    if (popup === popupCardAdd) {
      popup.setSubmitButtonText('Создать');
    } else {
      popup.setSubmitButtonText('Сохранить');
    }
  } else {
    popup.setSubmitButtonText('Сохранение...');
  }
}

const likeCardCallback = (isLiked, cardData, card) => {
  if (isLiked) {
    api.addLike(cardData._id)
      .then(answer => {
        card.setLikeCounter(answer.likes.length)
      })
      .catch((err) => {
      console.log(err)
    });
  } else {
    api.removeLike(cardData._id)
      .then(answer => {
        card.setLikeCounter(answer.likes.length);
      }).catch((err) => {
      console.log(err)
    })
  }
}

const deleteCardCallback = (cardData, card, evt) => {
  confirmPopup.setSubmitCallback(() => {
    api.removeCard(cardData._id)
      .then((data) => {
        card.deleteCard(evt)
        confirmPopup.close()
    })
      .catch((err) => {
        console.log(err)
      })
  })
  confirmPopup.open()
}

function createCardItem(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback) {
  return new Card(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback)
}

function editProfileFormSubmitHandler ({editProfileName, editProfileDescription}) {
  toggleLoading(popupEditProfile, false)
  api.editProfile(editProfileName, editProfileDescription)
    .then((answer) => {
    userInfo.setUserInfo(answer.name, answer.about)
    popupEditProfile.close()
  })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleLoading(popupEditProfile, true);
    })
}

function addCardFormSubmitHandler ({editPlaceName, editLinkPlace}) {
  toggleLoading(popupCardAdd, false);
  api.addCard(editPlaceName, editLinkPlace)
    .then(newPlace => {
      section.addItem(newPlace);
      popupCardAdd.close();
    })
    .catch((err) => {
    console.log(err)
  })
    .finally(() => {
      toggleLoading(popupCardAdd, true);
    });
}

function editAvatarFormSubmitHandler ({editLinkAvatar}) {
  toggleLoading(popupEditAvatar, false)
  const editAvatarPromise = api.editAvatar(editLinkAvatar)
  editAvatarPromise
    .then(data => {
      userInfo.setUserAvatar(data.avatar)
      popupEditAvatar.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleLoading(popupEditAvatar, true)
    })
}

const renderer = (item, container) => {
  const card = createCardItem(item, templateElement, popupWithImage.open.bind(popupWithImage), userInfo.getUserId(), deleteCardCallback, likeCardCallback)
  const cardDomNode = card.createDomNode()
  container.prepend(cardDomNode)
}

function updateUserInformation (userName, userProfession, userAvatar, userID) {
  userInfo.setUserInfo(userName, userProfession)
  userInfo.setUserId(userID)
  if (userAvatar) {
    userInfo.setUserAvatar(userAvatar)
  }
}

const section = new Section(renderer, containerSelector)

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '9dfdfed6-d744-4da1-85f3-1945f42ba2db',
    'Content-Type': 'application/json'
  }
})

Promise.all([
  api.getUserInformation(),
  api.getInitialCards()
])
  .then((values)=>{
    updateUserInformation(values[0].name, values[0].about, values[0].avatar, values[0]._id)
    section.renderItems(values[1].reverse())
  })
  .catch((err)=>{
    console.log(err)
  })

/*const editProfileFormValidator = new FormValidator(validationConfig, formProfElement)
const addPicFormValidator = new FormValidator(validationConfig, formPicElement)

addPicFormValidator.enableValidation()
editProfileFormValidator.enableValidation()

const popupEditProfile = new PopupWithForm(popupProfileSelector, editProfileFormSubmitHandler);
const popupCardAdd = new PopupWithForm(popupCardSelector, addCardFormSubmitHandler);
const popupWithImage = new PopupWithImage(popupImageSelector)
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
  popupWithImage.open(cardText, cardImage)
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
})*/
