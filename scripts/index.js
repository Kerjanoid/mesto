const editProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupNewPic = document.querySelector('.popup_new-picture');
const popupViewPic = document.querySelector('.popup_view-picture');
const closeButtons = document.querySelectorAll('.popup__close-button');
const formProfElement = document.querySelector('.popup__form_edit-profile');
const formPicElement = document.querySelector('.popup__form_new-picture');
constpup__input-field_type_subtitel');
const inputFieldPicTitel = document.querySelector('.popup__input-field_type_pic-titel');
const inputFieldPicLink = document.querySelector('.popup__input-field_type_pic-link');
const picElements = document.querySelectorAll('.element__img');
const addPicture = document.querySelector('.profile__add-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  clickCloser();
}

editProfile.addEventListener('click', () => {
  inputFieldTitel.value = profileTitel.textContent;
  inputFieldSubtitel.value = profileSubtitle.textContent;
  openPopup(popupProfile);
})

addPicture.addEventListener('click', () => {
  inputFieldPicTitel.value ='';
  inputFieldPicLink.value ='';
  openPopup(popupNewPic);
})

function closePopup(event) {
  const theTarget = event.target;
  const thePopup = theTarget.closest('.popup');
  thePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

closeButtons.forEach((button) => button.addEventListener('click', closePopup));

// Сохранение изменений в профиле
function changeProfile(event) {
  event.preventDefault();
  profileTitel.textContent = inputFieldTitel.value;
  profileSubtitle.textContent = inputFieldSubtitel.value;
  closePopup();
}

formProfElement.adeloper/cards-compressed/chelyabinsk-oblast.jpg'
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
  openPic(picture);
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
	const theTarget = event.target;
	const currentCard = theTarget.closest('.element');
	currentCard.remove();
}


// Добавление карточек
function addCard (event) {
  event.preventDefault();
  const card = createDomNode({name: inputFieldPicTitel.value, link: inputFieldPicLink.value});
  container.prepend(card);
  closePopup();
}

formPicElement.addEventListener('submit', addCard);

// Установка лайков
function toggleLike(event) {
	const target = event.target;
	target.classList.toggle('element__like_active');
}

// Попап картинки
const hugePic = document.querySelector('.popup__huge-picture');
const hugePicFigcap = document.querySelector('.popup__figcaption');

function openPic(picture) {
  picture.addEventListener('click', () => {
  hugePic.alt = picture.alt;
  hugePicFigcap.textContent = picture.alt;
  hugePic.src = picture.src;
  openPopup(popupViewPic);
});
}

// Функция закрытия на ESC
function keyHandler(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    openedPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
  }
}


// Функция закрытия попапа при клике вне формы
function clickCloser() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.addEventListener('click', closePopup);
  openedPopup.querySelector('.stop-propagation').addEventListener('click', function(event) {
    event.stopPropagation();
  });
}


