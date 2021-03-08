import {
  createMarkers, getMap, removeMarkers,
  DefaultCoordinates, MAP_SCALE, resetMainMarkerLatLng
} from './map.js';
import { disableForm, resetAdFormButton, resetForm, adForm } from './form.js';
import { setFormHandlers, resetDefaultAdPrice } from './validate-form.js';
import { getData, postData } from './api.js';
import { showAlert } from './util.js';
import { disableFilters, enableFilters, resetFilters } from './filter.js'
import { newSuccessModal, newErrorModal, showModal } from './show-modal.js';


const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://22.javascript.pages.academy/skeksobooking';

//Делаем страницу неактивной
disableForm();
disableFilters();

//инициализация карты + активация формы
const openstreetMap = getMap();

//сброс карты в исходное состояние
const resetMapView = () => {
  openstreetMap.setView({
    lat: DefaultCoordinates.X,
    lng: DefaultCoordinates.Y,
  }, MAP_SCALE);
}

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
      console.log('Отрисовка маркеров после удаления', ads);
      createMarkers(ads);
    }, 8000);

  })
  .catch(err => showAlert(err.message));

const setDefaults = () => {
  resetMapView();
  resetForm();
  resetFilters();
  resetMainMarkerLatLng();
  resetDefaultAdPrice();
  //возвращение маркеров после сброса фильтрации?
}

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

//Запускаем отправку формы
submitAdForm();



