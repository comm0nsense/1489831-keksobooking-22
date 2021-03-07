import { showAlert } from './util.js';
import { setFormInputHandlers, getPageInactive, resetAdFormButton, adForm, mapFilters } from './form.js';
import { getPins, getMainPin, getMap, DefaultCoordinates, MAP_SCALE } from './map.js';
import { setFormValidationHandlers } from './validate-form.js';
import { getData, postData } from './api.js';
import { newSuccessModal, newErrorModal, showModal } from './show-modal.js';


const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

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

//Сброс формы и фильтров
const setDefaults = () => {
  adForm.reset();
  mapFilters.reset();
  mainPin.setLatLng([35.6804, 139.759]);
  map.setView({
    lat: DefaultCoordinates.X,
    lng: DefaultCoordinates.Y,
  }, MAP_SCALE)
}

//Сброс страницы до состояния по умолчанию
resetAdFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults();
  mainPin.setLatLng([35.6804, 139.759]);
})

//Обработчик события submit
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
}

submitAdForm();

