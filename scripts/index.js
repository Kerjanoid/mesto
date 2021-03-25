const editProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupNewPic = document.querySelector('.popup_new-picture');
const popupViewPic = document.querySelector('.popup_view-picture');
const closeButtonList = document.querySelectorAll('.popup__close-button');
const formProfElement = document.querySelector('.popup__form_edit-profile');
const formPicElement = document.querySelector('.popup__form_new-picture');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const userNameInput = document.querySelector('.popup__input-field_type_titel');
const userProfessionInput = document.querySelector('.popup__input-field_type_subtitel');
const inputFieldPicTitel = document.querySelector('.popup__input-field_type_pic-titel');
const inputFieldPicLink = document.querySelector('.popup__input-field_type_pic-link');
const picsElement = document.querySelectorAll('.element__img');
const addPicture = document.querySelector('.profile__add-button');
const hugePic = document.querySelector('.popup__huge-picture');
const hugePicFigcap = document.querySelector('.popup__figcaption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  clickCloserEnable();
}

// Функция заполнения полей ввода значениями со страницы
function fillEditProfileFields() {
  userNameInput.value = profileTitle.textContent;
  userProfessionInput.value = profileSubtitle.textContent;
}

editProfile.addEventListener('click', () => {
  removeValidationErrors(validationConfig);
  fillEditProfileFields();
  openPopup(popupProfile);
  setEventListeners(popupProfile, validationConfig);
})

addPicture.addEventListener('click', () => {
  removeValidationErrors(validationConfig);
  formPicElement.reset();
  openPopup(popupNewPic);
  setEventListeners(popupNewPic, validationConfig);
})

function closePopup(popup) {
  clickCloserDisable();
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

// Закрытие попапа по крестику
closeButtonList.forEach((button) => button.addEventListener('click', (event) => {
  const target = event.target;
  const openedPopup = target.closest('.popup_opened');
  closePopup(openedPopup);
}))

// Внесение изменений в профиле
function changeProfile(event) {
  event.preventDefault();
  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = userProfessionInput.value;
  closePopup(popupProfile);
}

formProfElement.addEventListener('submit', changeProfile);

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
	const target = event.target;
	const currentCard = target.closest('.element');
	currentCard.remove();
}

// Добавление карточек
function addCard (event) {
  event.preventDefault();
  const card = createDomNode({name: inputFieldPicTitel.value, link: inputFieldPicLink.value});
  container.prepend(card);
  closePopup(popupNewPic);
}

formPicElement.addEventListener('submit', addCard);

// Установка лайков
function toggleLike(event) {
	const target = event.target;
	target.classList.toggle('element__like_active');
}

// Попап картинки
function openPic(picture) {
  picture.addEventListener('click', () => {
    hugePic.alt = picture.alt;
    hugePicFigcap.textContent = picture.alt;
    hugePic.src = picture.src;
    openPopup(popupViewPic);
  });
}

// Функция закрытия на ESC
const keyHandler = (event) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

// Функция закрытия попапа при клике вне формы + listener
function clickCloserEnable() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.addEventListener('click', () => closePopup(openedPopup));
  openedPopup.querySelector('.stop-propagation').addEventListener('click', function(event) {
    event.stopPropagation();
  });
}

// Функция отключения listener clickCloser
function clickCloserDisable() {
  const openedPopup = document.querySelector('.popup_opened');
  document.removeEventListener('click', () => closePopup(openedPopup));
}

