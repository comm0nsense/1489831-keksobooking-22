import { showAlert } from './util.js';
import { setFormInputHandlers, getPageInactive } from './form.js';
import { getMap, getPins, getMainPin } from './map.js';
import { setFormValidationHandlers } from './validate-form.js';
import { getData } from './api.js';


//Делаем страницу неактивной
getPageInactive();

//Рисуем карту и пины
const map = getMap();
getMainPin(map);
getData()
  .then(offers => getPins(map, offers))
  .catch(err => showAlert(err.message));

//Обработчики формы
setFormInputHandlers();
setFormValidationHandlers();

