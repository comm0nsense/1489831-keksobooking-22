import { showAlert } from './util.js';
import { setFormInputHandlers, getPageInactive } from './form.js';
import { getMap, getPins, getMainPin } from './map.js';
import { setFormValidationHandlers } from './validate-form.js';
import { getData } from './api.js';
import { } from './show-modal.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

//Делаем страницу неактивной
getPageInactive();

//Рисуем карту и пины
const map = getMap();
getMainPin(map);
getData(GET_DATA_URL)
  .then(offers => getPins(map, offers))
  .catch(err => showAlert(err.message));

//Обработчики формы
setFormInputHandlers();
setFormValidationHandlers();

