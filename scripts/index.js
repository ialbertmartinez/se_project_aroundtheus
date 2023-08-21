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
const modalEdit = page.querySelector("#modal-edit");
const modalAdd = page.querySelector("#modal-add");
const modalImg = page.querySelector("#modal-image");
const profile = pageWrapper.querySelector(".profile");

// buttons & other dom elements
const cards = pageWrapper.querySelector(".cards");
const cardsGallery = pageWrapper.querySelector(".cards__gallery");
const cardTemplate = pageWrapper.querySelector("#card").content;

const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editBtn = pageWrapper.querySelector(".profile__edit-button");
const addBtn = pageWrapper.querySelector(".profile__add-button");
const editCloseBtn = modalEdit.querySelector(".modal__close-button");
const addCloseBtn = modalAdd.querySelector(".modal__close-button");
const likeBtn = cards.querySelectorAll(".card__like-button");
const modalImage = modalImg.querySelector(".modal__image");
const modalCaption = modalImg.querySelector(".modal__caption");

// form & form data
const modalEditForm = modalEdit.querySelector(".modal__form");
const modalAddForm = modalAdd.querySelector(".modal__form");
const inputTitle = modalEdit.querySelector(".modal__input_type_title");
const inputSubtitle = modalEdit.querySelector(".modal__input_type_subtitle");
const inputCardTitle = modalAdd.querySelector(".modal__input_type_title");
const inputCardUrl = modalAdd.querySelector(".modal__input_type_subtitle");

function openModal(modal) {
  modal.classList.add("modal_opened");
  inputTitle.value = profileTitle.innerText;
  inputSubtitle.value = profileSubtitle.innerText;
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  inputCardUrl.value = "";
  inputCardTitle.value = "";
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.innerText = inputTitle.value;
  profileSubtitle.innerText = inputSubtitle.value;
  closeModal(modalEdit);
}

function handleAddFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    link: inputCardUrl.value,
    name: inputCardTitle.value,
  };
  const cardsGallery = pageWrapper.querySelector(".cards__gallery");
  cardsGallery.prepend(renderCard(cardData));
  closeModal(modalAdd);
  inputCardUrl.value = "";
  inputCardTitle.value = "";
}

function likeIt(e) {
  const classes = e.target.classList;
  if (classes.contains("card__like-button")) {
    if (classes.contains("liked")) {
      classes.remove("liked");
    } else {
      classes.add("liked");
    }
  }
}

function deleteIt(e) {
  e.target.closest(".card").remove();
}

function renderCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteBtn = cardElement.querySelector(".card__delete-button");
  const modalCloseBtn = modalImg.querySelector(".modal__close-button");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardElement.addEventListener("click", likeIt);
  deleteBtn.addEventListener("click", deleteIt);
  modalCloseBtn.addEventListener("click", function () {
    closeModal(modalImg);
  });

  // img modal
  cardImage.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.alt;
    modalCaption.textContent = data.name;
    openModal(modalImg);
  });

  return cardElement;
}

editBtn.addEventListener("click", () => openModal(modalEdit));
editCloseBtn.addEventListener("click", () => closeModal(modalEdit));
modalEditForm.addEventListener("submit", handleProfileFormSubmit);

addBtn.addEventListener("click", () => openModal(modalAdd));
addCloseBtn.addEventListener("click", () => closeModal(modalAdd));
modalAddForm.addEventListener("submit", handleAddFormSubmit);

initialCards.forEach(function (card) {
  const cardElement = renderCard(card);
  cardsGallery.prepend(cardElement);
});
