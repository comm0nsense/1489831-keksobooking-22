import { DefaultCoordinates } from './map.js'
import { postData } from './api.js'
import { showModal, newSuccessModal, newErrorModal } from './show-modal.js'

//Константы
const POST_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

//Форма и поля
const adForm = document.querySelector('.ad-form');
const adFormAddress = adForm.querySelector('#address');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

//Кнопка сброса формы
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

//Обработчик события submit
const submitAdForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    postData(POST_DATA_URL, formData)
      .then(() => {
        showModal(newSuccessModal);
        // setDefaults();
      })
      .catch(() => {
        showModal(newErrorModal)
      });
  });
};


export {
  enableForm,
  disableForm,
  adFormAddress,
  adForm,
  resetAdFormButton,
  submitAdForm
}
