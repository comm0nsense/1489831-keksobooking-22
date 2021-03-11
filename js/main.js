import { renderMarkers, openstreetMap } from './map.js';
import { disableForm } from './form.js';
import { setFormHandlers } from './validate-form.js';
import { getData} from './api.js';
import { showAlert } from './show-modal.js';
import { disableFilters, enableFilters } from './filter.js';
import { submitAdForm } from './submit-form.js';
import { fileUpload} from './file-upload.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

//Делаем страницу неактивной
disableForm();
disableFilters();

//инициализация карты + активация формы
openstreetMap();

//Обработчики формы
setFormHandlers();

//Загружаем данные по объявлениям и включаем фильтрацию
getData(GET_DATA_URL)
  .then((ads) => {
    enableFilters();
    renderMarkers(ads);
  })
  .catch(err => showAlert(err.message));

//Запускаем отправку формы
submitAdForm();

//Подключаем модуль загрузки аватарки и фоток
fileUpload();
