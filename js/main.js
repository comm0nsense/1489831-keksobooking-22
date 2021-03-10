import {
  createMarkers, getMap, DefaultCoordinates, MAP_SCALE, resetMainMarkerLatLng
} from './map.js';
import { disableForm, resetAdFormButton, resetForm, adForm } from './form.js';
import { setFormHandlers, resetDefaultAdPrice } from './validate-form.js';
import { getData, postData } from './api.js';
import { showAlert } from './util.js';
import { disableFilters, enableFilters, resetFilters, setFilterHandler, MAX_ADS_COUNT } from './filter.js'
import { newSuccessModal, newErrorModal, showModal } from './show-modal.js';


const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

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

let slicedAds = [];

//отрисовка маркеров
const renderMarkers = (ads) => {
  slicedAds = ads.slice(0, MAX_ADS_COUNT);
  createMarkers(slicedAds);
  setFilterHandler(ads);
}

//Загружаем данные по объявлениям
getData(GET_DATA_URL)
  .then((ads) => {
    console.log(ads);
    enableFilters();
    renderMarkers(ads);
  })
  .catch(err => showAlert(err.message));

const setDefaults = () => {
  resetMapView();
  resetForm();
  resetFilters();
  resetMainMarkerLatLng();
  resetDefaultAdPrice();
  createMarkers(slicedAds);
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
