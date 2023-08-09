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
const modal = page.querySelector(".modal");
const profileFormElement = modal.querySelector(".modal__form");
const inputTitle = modal.querySelector(".modal__input_type_title");
const inputSubtitle = modal.querySelector(".modal__input_type_subtitle");
const editBtn = pageWrapper.querySelector(".profile__edit-button");
const closeBtn = modal.querySelector(".modal__close-button");

editBtn.addEventListener("click", function () {
  modal.classList.add("modal_opened");

  inputTitle.value = profileTitle.innerText;
  inputSubtitle.value = profileSubtitle.innerText;
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// the form submission handler
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.innerText = inputTitle.value;
  profileSubtitle.innerText = inputSubtitle.value;

  modal.classList.remove("modal_opened");
}
