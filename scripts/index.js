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

// wrappers
const page = document.querySelector(".page");
const pageWrapper = page.querySelector(".page__wrapper");
const popupEdit = page.querySelector("#popup-edit");
const popupAdd = page.querySelector("#popup-add");
const popupImg = page.querySelector("#popup-image");
const profile = pageWrapper.querySelector(".profile");
const popupOverlay = page.querySelector(".popup");

// buttons & other dom elements
const cards = pageWrapper.querySelector(".cards");
const cardsGallery = pageWrapper.querySelector(".cards__gallery");
const cardTemplate = pageWrapper.querySelector("#card").content;

const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editBtn = pageWrapper.querySelector(".profile__edit-button");
const addBtn = pageWrapper.querySelector(".profile__add-button");
const editCloseBtn = popupEdit.querySelector(".popup__close-button");
const addCloseBtn = popupAdd.querySelector(".popup__close-button");
const likeBtn = cards.querySelectorAll(".card__like-button");
const popupImage = popupImg.querySelector(".popup__image");
const popupCaption = popupImg.querySelector(".popup__caption");
const popupImageCloseBtn = popupImg.querySelector(".popup__close-button");

// form & form data
const popupEditForm = popupEdit.querySelector(".popup__form");
const popupAddForm = popupAdd.querySelector(".popup__form");
const addFormSubmitBtn = popupAddForm.querySelector(".popup__button");
const inputTitle = popupEdit.querySelector(".popup__input_type_title");
const inputSubtitle = popupEdit.querySelector(".popup__input_type_subtitle");
const inputCardTitle = popupAdd.querySelector(".popup__input_type_title");
const inputCardUrl = popupAdd.querySelector(".popup__input_type_subtitle");

const hasOpened = (popup) => popup.classList.contains("popup_opened");

const handleOverlayClicks = (e) => {
  console.log("handling clicks to the overlay");
  console.log(`inside handleOverlayClickse.target: ${e.target}`);
  if (e.target.classList.contains("popup_opened")) {
    closePopup(e.target);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleOverlayClicks);
  popup.addEventListener("keyup", (e) => {
    console.log(`e: ${e}`);
    if (e.key === "Escape") {
      console.log(`popup: ${popup}`);
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(popupEdit);
}

const disableSubmitButton = (buttonEl, inactiveButtonClass) => {
  buttonEl.classList.add(inactiveButtonClass);
  return (buttonEl.disabled = true);
};

function handleAddFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    link: inputCardUrl.value,
    name: inputCardTitle.value,
  };
  const cardsGallery = pageWrapper.querySelector(".cards__gallery");
  cardsGallery.prepend(renderCard(cardData));
  closePopup(popupAdd);
  popupAddForm.reset();
  disableSubmitButton(addFormSubmitBtn, "popup__button_disabled");
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
    openPopup(popupImg);
  });

  return cardElement;
}
editBtn.addEventListener("click", () => {
  inputTitle.value = profileTitle.innerText;
  inputSubtitle.value = profileSubtitle.innerText;
  openPopup(popupEdit);
});
editCloseBtn.addEventListener("click", () => closePopup(popupEdit));
popupEditForm.addEventListener("submit", handleProfileFormSubmit);

addBtn.addEventListener("click", () => openPopup(popupAdd));
addCloseBtn.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", handleAddFormSubmit);

popupImageCloseBtn.addEventListener("click", function () {
  closePopup(popupImg);
});
initialCards.forEach(function (card) {
  const cardElement = renderCard(card);
  cardsGallery.prepend(cardElement);
});
