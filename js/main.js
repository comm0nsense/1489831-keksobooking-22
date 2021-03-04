import { showAlert } from './util.js';
import { setFormInputHandlers, getPageInactive, resetAdFormButton } from './form.js';
import { getPins, getMainPin, getMap } from './map.js';
import { setFormValidationHandlers } from './validate-form.js';
import { getData } from './api.js';
import { } from './show-modal.js';
import { setDefaults, submitAdForm } from './submit-reset-form.js'

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

//Делаем страницу неактивной
getPageInactive();

//Рисуем карту и пины
const map = getMap();
const mainPin = getMainPin(map);

//Загружаем данные по объявлениям
getData(GET_DATA_URL)
  .then(offers => getPins(map, offers))
  .catch(err => showAlert(err.message));

//Обработчики формы
setFormInputHandlers();
setFormValidationHandlers();


//Сброс страницы по состояния по умолчанию
resetAdFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults();
  mainPin.setLatLng([35.6804, 139.759]);
})



