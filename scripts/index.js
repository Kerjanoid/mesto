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

// Сохранение изменений в профиле

function changeProfile(event) {
  event.preventDefault();
  profileTitel.textContent = inputFieldTitel.value;
  profileSubtitle.textContent = inputFieldSubtitel.value;
  closePopup(event);
};

formElement.addEventListener('submit', changeProfile);

// Установка лайков

// for (let i= 0; i < likes.length; i++) {
//   likes[i].addEventListener('click', function() {
//     likes[i].classList.toggle('element__like_active');
//   });
// }

// Карточки "из коробки"
const initialCards = [
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
];

// Работа с Template
const container = document.querySelector('.elements');
const templateElement = document.querySelector('.template');

function createDomNode(item) {
	const newCard = templateElement.content.cloneNode(true);
	const title = newCard.querySelector('.element__title');
  const picture = newCard.querySelector('.element__img');
	title.textContent = item.name;
  picture.src = item.link;

	return newCard;
}


function renderList() {
	const result = initialCards.map(function(item) {
		const newCard = createDomNode(item);
		// addTaskListeners(newCard);

		return newCard;
	});

	container.append(...result);
}

renderList()

