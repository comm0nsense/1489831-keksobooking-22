import { postData } from './api.js';
import { newSuccessModal, newErrorModal, showModal } from './show-modal.js';
import { adForm, mapFilters } from './form.js';
import {  } from './map.js';

// Константы
const POST_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

//Обработчик события submit
const submitAdForm = (callback) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    postData(POST_DATA_URL, formData)
      .then(() => showModal(newSuccessModal))
      .catch(() => showModal(newErrorModal));

    callback();

  });
}


//Сброс формы и фильтров
const setDefaults = () => {
  adForm.reset();
  mapFilters.reset();
  // mainPin.setLatLng([35.6804, 139.759]);
}

submitAdForm(setDefaults);

export { setDefaults, submitAdForm };
