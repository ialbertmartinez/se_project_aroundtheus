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

const page = document.querySelector(".page");
const pageWrapper = page.querySelector(".page__wrapper");
const profile = pageWrapper.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

const modalEdit = page.querySelector("#modal-edit");
const modalEditForm = modalEdit.querySelector(".modal__form");

const modalAdd = page.querySelector("#modal-add");
const modalAddForm = modalAdd.querySelector(".modal__form");

const inputTitle = modalEdit.querySelector(".modal__input_type_title");
const inputSubtitle = modalEdit.querySelector(".modal__input_type_subtitle");

const inputCardTitle = modalAdd.querySelector(".modal__input_type_title");
const inputCardUrl = modalAdd.querySelector(".modal__input_type_subtitle");

const editBtn = pageWrapper.querySelector(".profile__edit-button");
const editCloseBtn = modalEdit.querySelector(".modal__close-button");

const addBtn = pageWrapper.querySelector(".profile__add-button");
const addCloseBtn = modalAdd.querySelector(".modal__close-button");

function openModalForm(modal) {
  modal.classList.add("modal_opened");

  inputTitle.value = profileTitle.innerText;
  inputSubtitle.value = profileSubtitle.innerText;
}

function closeModalForm(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log(evt.target);
  profileTitle.innerText = inputTitle.value;
  profileSubtitle.innerText = inputSubtitle.value;
  closeModalForm(modalEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    link: inputCardUrl.value,
    name: inputCardTitle.value,
  };
  const cardsGallery = pageWrapper.querySelector(".cards__gallery");
  cardsGallery.prepend(renderCard(cardData));
  inputCardUrl.value = "";
  inputCardTitle.value = "";
  closeModalForm(modalAdd);
}

function renderCard(data) {
  const cardTemplate = pageWrapper.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

editBtn.addEventListener("click", () => {
  openModalForm(modalEdit);
});
editCloseBtn.addEventListener("click", () => closeModalForm(modalEdit));
modalEditForm.addEventListener("submit", handleProfileFormSubmit);

addBtn.addEventListener("click", () => {
  openModalForm(modalAdd);
});
addCloseBtn.addEventListener("click", () => {
  closeModalForm(modalAdd);
});
modalAddForm.addEventListener("submit", handleAddFormSubmit);

initialCards.forEach(function (card) {
  const cardsGallery = pageWrapper.querySelector(".cards__gallery");
  const cardElement = renderCard(card);
  cardsGallery.prepend(cardElement);
});
