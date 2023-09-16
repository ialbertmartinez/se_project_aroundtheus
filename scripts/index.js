// card data
const initialCards = [
  {
    name: "New York",
    link: "https://images.unsplash.com/photo-1643049320618-f271858d7b0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=440&q=80",
  },
  {
    name: "San Francisco",
    link: "https://images.unsplash.com/photo-1651395569489-6624ebb0c216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=299&q=80",
  },
  {
    name: "Palm Springs",
    link: "https://images.unsplash.com/photo-1648222604786-8e80813db112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
  },
  {
    name: "Berlin",
    link: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Amsterdam",
    link: "https://images.unsplash.com/photo-1459679749680-18eb1eb37418?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Barcelona",
    link: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
  },
];

// wrappers & main sections
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const cards = page.querySelector(".cards");

// overlay elements
const editPopup = document.getElementById("popup-edit");
const addPopup = document.getElementById("popup-add");
const imgPopup = document.getElementById("popup-image");

// forms & submit buttons
const forms = document.forms;
const editForm = forms["popup-edit-form"];
const addForm = forms["popup-add-form"];

// other dom elements
const cardsGallery = cards.querySelector(".cards__gallery");
const cardTemplate = cards.querySelector("#card").content;

const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

// popup ui
const editBtn = profile.querySelector(".profile__edit-button");
const editCloseBtn = editPopup.querySelector(".popup__close-button");
const addBtn = profile.querySelector(".profile__add-button");
const addCloseBtn = addPopup.querySelector(".popup__close-button");

// popup img aka Large img
const popupImage = imgPopup.querySelector(".popup__image");
const popupCaption = imgPopup.querySelector(".popup__caption");
const popupImageCloseBtn = imgPopup.querySelector(".popup__close-button");

// input fields
const inputTitle = editForm.querySelector(".popup__input_type_name");
const inputSubtitle = editForm.querySelector(".popup__input_type_subtitle");
const inputCardTitle = addForm.querySelector(".popup__input_type_title");
const inputCardUrl = addForm.querySelector(".popup__input_type_url");

const closeWithEsc = (e) => {
  if (e.key === "Escape") {
    const popup = page.querySelector(".popup_opened");
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", closeWithEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", handleOverlayClick);
  document.removeEventListener("keydown", closeWithEsc);
}

function handleOverlayClick(e) {
  const popup = e.target;
  if (popup.classList.contains("popup_opened")) {
    closePopup(popup);
  }
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(editPopup);
}

function handleAddFormSubmit(e) {
  e.preventDefault();
  const popup = page.querySelector(".popup_opened");
  const formEl = popup.querySelector(".popup__form");
  const submitBtn = popup.querySelector(".popup__button");
  const cardData = {
    link: inputCardUrl.value,
    name: inputCardTitle.value,
  };

  cardsGallery.prepend(renderCard(cardData));
  closePopup(popup);
  disableButton(submitBtn, config);
  formEl.reset();
}

function likeCard(e) {
  e.target.classList.toggle("card__like-button_liked");
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function renderCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeBtn.addEventListener("click", likeCard);
  deleteBtn.addEventListener("click", deleteCard);

  // img popup
  cardImage.addEventListener("click", () => {
    popupImage.src = data.link;
    popupImage.alt = data.alt;
    popupCaption.textContent = data.name;
    openPopup(imgPopup);
  });

  return cardElement;
}

editBtn.addEventListener("click", () => {
  inputTitle.value = profileTitle.innerText;
  inputSubtitle.value = profileSubtitle.innerText;
  openPopup(editPopup);
});

editCloseBtn.addEventListener("click", () => closePopup(editPopup));
editForm.addEventListener("submit", handleProfileFormSubmit);

addBtn.addEventListener("click", () => openPopup(addPopup));
addCloseBtn.addEventListener("click", () => closePopup(addPopup));
addForm.addEventListener("submit", handleAddFormSubmit);

popupImageCloseBtn.addEventListener("click", () => closePopup(imgPopup));

initialCards.forEach(function (card) {
  const cardElement = renderCard(card);
  cardsGallery.prepend(cardElement);
});
