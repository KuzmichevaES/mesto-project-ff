export const enableValidation = (functionObject) => {
    const formList = Array.from(document.querySelectorAll(functionObject.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, functionObject);
    });
}

const showInputError = (formElement, inputElement, errorMessage, functionObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(functionObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(functionObject.errorClass);
};

const hideInputError = (formElement, inputElement, functionObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(functionObject.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(functionObject.errorClass);
};

export const clearValidation = (formElement, functionObject) => {
    const inputList = Array.from(formElement.querySelectorAll(functionObject.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, functionObject);
    });
}

export const reloadValidation = (formElement, buttonElement, functionObject) => {
  const inputList = Array.from(formElement.querySelectorAll(functionObject.inputSelector));
  toggleButtonState(inputList, buttonElement, functionObject);
}

const checkInputValidity = (formElement, inputElement, functionObject) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, functionObject);
    } else {
        hideInputError(formElement, inputElement, functionObject);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
  };

const toggleButtonState = (inputList, buttonElement, functionObject) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(functionObject.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(functionObject.inactiveButtonClass);
    };
};

const setEventListeners = (formElement, functionObject) => {
    const inputList = Array.from(formElement.querySelectorAll(functionObject.inputSelector));
    const buttonElement = formElement.querySelector(functionObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, functionObject);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, functionObject);
        toggleButtonState(inputList, buttonElement, functionObject);
      });
    });
  }; 

