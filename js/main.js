import { createMarkers, getMap, removeMarkers,
  DefaultCoordinates, MAP_SCALE } from './map.js';
import { disableForm, submitAdForm, adForm, resetAdFormButton } from './form.js';
import { setFormHandlers } from './validate-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { disableFilters, enableFilters, mapFilters } from './filter.js'
// import { newSuccessModal, newErrorModal, showModal } from './show-modal.js';


const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

//Делаем страницу неактивной
disableForm();
disableFilters();

//инициализация карты + активация формы
const openstreetMap = getMap();

//Обработчики формы
setFormHandlers();

//Загружаем данные по объявлениям
getData(GET_DATA_URL)
  .then((ads) => {
    console.log('Загружены объявления с сервера:', ads);
    createMarkers(ads);
    enableFilters();

    setTimeout(() => {
      removeMarkers();
    }, 5000);

    setTimeout(() => {
      console.log('отрисовки маркеров после удаления', ads);
      createMarkers(ads);
    }, 8000);

  })
  .catch(err => showAlert(err.message));

//Запускаем отправку формы
submitAdForm();

const setDefaults = () => {
  adForm.reset();
  mapFilters.reset();
  openstreetMap.setView({
    lat: DefaultCoordinates.X,
    lng: DefaultCoordinates.Y,
  }, MAP_SCALE);
};

//Сброс страницы до состояния по умолчанию
resetAdFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  setDefaults();
  //   mainPin.setLatLng([35.6804, 139.759]);
})
//Сброс формы и фильтров
// const setDefaults = () => {
//   adForm.reset();
//   mapFilters.reset();
//   mainPin.setLatLng([35.6804, 139.759]);
//   map.setView({
//     lat: DefaultCoordinates.X,
//     lng: DefaultCoordinates.Y,
//   }, MAP_SCALE)
// }

//Сброс страницы до состояния по умолчанию
// resetAdFormButton.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   setDefaults();
//   mainPin.setLatLng([35.6804, 139.759]);
// })


