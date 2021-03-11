import { resetMapView, resetMainMarkerLatLng, createMarkers, slicedAds } from './map.js'
import { resetForm, resetAdFormButton } from './form.js'
import { resetFilters} from './filter.js'
import {resetDefaultAdPrice } from './validate-form.js'
import { newSuccessModal, newErrorModal, showModal } from './show-modal.js';
import { adForm } from './form.js';
import { postData } from './api.js';
import { clearFileSrc, avatarPreview, avatarPreviewSrc, clearPhotoUpload } from './file-upload.js'

const POST_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

const setDefaults = () => {
  resetMapView();
  resetForm();
  resetFilters();
  resetMainMarkerLatLng();
  resetDefaultAdPrice();
  createMarkers(slicedAds);
  clearFileSrc(avatarPreview, avatarPreviewSrc);
  clearPhotoUpload();
};

//Сброс страницы до состояния по умолчанию по нажатию кнопки Очистить
resetAdFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults()
});

//Обработчик события Отправки формы
const submitAdForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    postData(POST_DATA_URL, formData)
      .then(() => {
        showModal(newSuccessModal);
        setDefaults();
      })
      .catch(() => {
        showModal(newErrorModal)
      });
  });
};

export {
  setDefaults,
  submitAdForm
}
