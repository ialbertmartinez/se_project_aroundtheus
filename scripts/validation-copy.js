const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);

  inputEl.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = "";
};

const showInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorEl.classList.add(errorClass);
  errorEl.textContent = inputEl.validationMessage;
};

const checkInputValidity = (formEl, inputEl, options) => {
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, options);
  } else {
    showInputError(formEl, inputEl, options);
  }
};

const hasInvalidInput = (inputEls) => {
  return inputEls.some((inputEl) => !inputEl.validity.valid);
};

const disableButton = (buttonEl, { inactiveButtonClass }) => {
  buttonEl.classList.add(inactiveButtonClass);
  buttonEl.disabled = true;
};

const enableButton = (buttonEl, { inactiveButtonClass }) => {
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.disabled = false;
};

const toggleButtonState = (inputEls, buttonEl, options) => {
  if (hasInvalidInput(inputEls)) {
    disableButton(buttonEl, options);
  } else {
    enableButton(buttonEl, options);
  }
};

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const buttonEl = formEl.querySelector(submitButtonSelector);

  toggleButtonState(inputEls, buttonEl, options);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, buttonEl, options);
    });
  });
}
// pass all the settings on call
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}
enableValidation(config);
