const editProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupNewPic = document.querySelector('.popup_new-picture');
const popupViewPic = document.querySelector('.popup_view-picture');
const closeButton = document.querySelectorAll('.popup__close-button');
const formProfElement = document.querySelector('.popup__form_edit-profile');
const formPicElement = document.querySelector('.popup__form_new-picture');
const profileTitel = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputFieldTitel = document.querySelector('.popup__input-field_type_titel');
const inputFieldSubtitel = document.querySelector('.popup__input-field_type_subtitel');
const inputFieldPicTitel = document.querySelector('.popup__input-field_type_pic-titel');
const inputFieldPicLink = document.querySelector('.popup__input-field_type_pic-link');
const picCardTitel = document.querySelector('.element__title');
const picCardImg = document.querySelector('.element__img');
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
  inputFieldTitel.value = profileTitel.textContent;
  inputFieldSubtitel.value = profileSubtitle.textContent;

function changeProfile(event) {
  event.preventDefault();
  profileTitel.textContent = inputFieldTitel.value;
  profileSubtitle.textContent = inputFieldSubtitel.value;
  closePopup(event);
};

formProfElement.addEventListener('submit', changeProfile);



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
const templateElement = document.querySelector('.template').content;

// Template нода
function createDomNode(item) {
	const newCard = templateElement.querySelector('.element').cloneNode(true);
	const title = newCard.querySelector('.element__title');
  const picture = newCard.querySelector('.element__img');
	title.textContent = item.name;
  picture.alt = item.name;
  picture.src = item.link;
  const deleteButton = newCard.querySelector('.element__trash-button');
  deleteButton.addEventListener('click', deleteCard);
  const toggleLikes = newCard.querySelector('.element__like');
  toggleLikes.addEventListener('click', toggleLike);

	return newCard;
}

// Рендер карточек "из коробки"
function renderList() {
	const result = initialCards.map(function(item) {
		const newCard = createDomNode(item);

		return newCard;
	});

	container.append(...result);
}

renderList()

// Удаление карточки

function deleteCard(event) {
	const target = event.target;
	const currentCard = target.closest('.element');

	currentCard.remove();
}


// Добавление карточек

function addCard (event) {
  event.preventDefault();
  const card = createDomNode({name: inputFieldPicTitel.value, link: inputFieldPicLink.value});
  container.prepend(card);
  closePopup(event);
  inputFieldPicTitel.value ='';
  inputFieldPicLink.value ='';
}

formPicElement.addEventListener('submit', addCard);

// Установка лайков

function toggleLike(event) {
	const target = event.target;
  
	target.classList.toggle('element__like_active');
}
