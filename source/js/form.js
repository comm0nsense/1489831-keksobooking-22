import { DefaultCoordinates } from './map.js'

const adForm = document.querySelector('.ad-form');
const adFormAddress = adForm.querySelector('#address');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const resetAdFormButton = adForm.querySelector('.ad-form__reset');

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  adFormElements.forEach(formElement => formElement.disabled = true);
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  adFormElements.forEach(formElement => formElement.disabled = false);
  adFormAddress.value = `${DefaultCoordinates.X}, ${DefaultCoordinates.Y}`;
};

adFormAddress.readOnly = true;

const resetForm = () => {
  adForm.reset();
  adFormAddress.value = `${DefaultCoordinates.X}, ${DefaultCoordinates.Y}`;
};

export {
  enableForm,
  disableForm,
  adFormAddress,
  adForm,
  resetAdFormButton,
  resetForm
}
