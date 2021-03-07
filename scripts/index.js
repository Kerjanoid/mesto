const editProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupNewPic = document.querySelector('.popup_new-picture');
const popupViewPic = document.querySelector('.popup_view-picture');
const closeButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__content');
const profileTitel = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputFieldTitel = document.querySelector('.popup__input-field_type_titel');
const inputFieldSubtitel = document.querySelector('.popup__input-field_type_subtitel');
const likes = document.querySelectorAll('.element__like');
const addPicture = document.querySelector('.profile__add-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

editProfile.addEventListener('click', () => {
  openPopup(popupProfile);
});

addPicture.addEventListener('click', () => {
  openPopup(popupNewPic);
});

function closePopup(event) {
  const theTarget = event.target;
  const thePopup = theTarget.closest('.popup');
  thePopup.classList.remove('popup_opened');
};

closeButton.forEach((button) => button.addEventListener('click', closePopup));

// closeButton.forEach((button) => button.addEventListener('click', () => {
//   closePopup(popupNewPic);
// }));

// closeButton.addEventListener('click', () => {
//   closePopup(popupNewPic);
// });



// function openPopupNewPic() {
//   popupNewPic.classList.add('popup_opened');
// };

// function openPopupViewPic() {
//   popupViewPic.classList.add('popup_opened');
// };

// function closePopup() {
//   popupProfile.classList.remove('popup_opened');
//   popupNewPic.classList.remove('popup_opened');
// };

// editProfile.addEventListener('click', openPopupProfile);
// closeButton.addEventListener('click', closePopup);

function changeProfile(event) {
  event.preventDefault();
  profileTitel.textContent = inputFieldTitel.value;
  profileSubtitle.textContent = inputFieldSubtitel.value;
  closePopup(event);
};

formElement.addEventListener('submit', changeProfile);

// addPicture.addEventListener('click', openPopupNewPic);

//function changeProfile(event) {
  //event.preventDefault();
  //profileTitel.textContent = inputFieldTitel.value;
  //profileSubtitle.textContent = inputFieldSubtitel.value;
  //togglePopup();
//};

//formElement.addEventListener('submit', changeProfile);

for (let i= 0; i < likes.length; i++) {
  likes[i].addEventListener('click', function() {
    likes[i].classList.toggle('element__like_active');
  });
}

