import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { containerSelector, templateElement, editProfile, editAvatar,
  formProfElement,formPicElement, formAvatarElement, userNameInput,
  userProfessionInput, addPicture, subtitleSelector, nameSelector,
  avatarSelector, popupProfileSelector, popupCardSelector, popupImageSelector,
  popupAvatarSelector, popupDeleteAgreementSelector, validationConfig } from '../utils/constants.js'

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
      popup.setSubmitButtonText('Создать')
    } else {
      popup.setSubmitButtonText('Сохранить')
    }
  } else {
    popup.setSubmitButtonText('Сохранение...')
    popup.setSubmitButtonAttribute()
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
      .then(() => {
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

function editProfileFormSubmitHandler (userData) {
  toggleLoading(popupEditProfile, false)
  api.editProfile(userData)
    .then(answer => {
    userInfo.setUserInfo(answer.name, answer.about)
    popupEditProfile.close()
  })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleLoading(popupEditProfile, true)
    })
}

function addCardFormSubmitHandler (cardData) {
  toggleLoading(popupCardAdd, false)
  api.addCard(cardData)
    .then(newPlace => {
      section.addItem(newPlace)
      popupCardAdd.close()
    })
    .catch((err) => {
    console.log(err)
  })
    .finally(() => {
      toggleLoading(popupCardAdd, true)
    })
}

function editAvatarFormSubmitHandler (editLinkAvatar) {
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
  .then(([userData, cards])=>{
    updateUserInformation(userData.name, userData.about, userData.avatar, userData._id)
    section.renderItems(cards.reverse())
  })
  .catch((err)=>{
    console.log(err)
  })
