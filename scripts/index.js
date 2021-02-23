let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__content');
let profileTitel = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputFieldTitel = document.querySelector('.popup__input-field_type_titel');
let inputFieldSubtitel = document.querySelector('.popup__input-field_type_subtitel');
let likes = document.querySelectorAll('.element__like');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  inputFieldTitel.value = profileTitel.textContent;
  inputFieldSubtitel.value = profileSubtitle.textContent;
};

editProfile.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function changeProfile(event) {
  event.preventDefault();
  profileTitel.textContent = inputFieldTitel.value;
  profileSubtitle.textContent = inputFieldSubtitel.value;
  togglePopup();
};

formElement.addEventListener('submit', changeProfile);

for (let i= 0; i < likes.length; i++) {
  likes[i].addEventListener('click', function() {
    likes[i].classList.toggle('element__like_active');
  });
}

