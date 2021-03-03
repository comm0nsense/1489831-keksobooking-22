import { postData } from './api.js';
import { newSuccessModal, newErrorModal, showModal } from './show-modal.js'

//Константы
const POST_DATA_URL = 'https://22.javascript.pages.academy/skeksobooking';

const TypeToPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};


//Форма и поля ввода карточки
const adForm = document.querySelector('.ad-form');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const adFormAddress = adForm.querySelector('#address');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

//Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const mapFiltersIds = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

//Делает форму объявления и фильтрацию неактивными
const getPageInactive = () => {
  //форма объявления
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  adFormElements.forEach(formElement => formElement.disabled = true);

  //фильтрация объявлений
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = true);
  mapFeatures.disabled = true;
};

//Делаем координаты недоступными для редактированя
adFormAddress.readOnly = true;

// Подстановка мин стоимости по типу жилья
const updateOfferPrice = () => {
  adPrice.placeholder = TypeToPrice[adType.value];
  adPrice.min = TypeToPrice[adType.value];
};


// Подстановка времени выезда по вермени заезда
const updateCheckTime = (evt) => {
  switch (evt.target) {
    case timeIn:
      timeOut.value = evt.target.value;
      break;
    case timeOut:
      timeIn.value = evt.target.value;
      break;
  }
};


//Делаем страницу активной и подключаем проверки
const getPageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  adFormElements.forEach(formElement => formElement.disabled = false);

  //фильтрация
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = false);
  mapFeatures.disabled = false;
};

//Обработчики событий
const setFormInputHandlers = () => {
  adType.addEventListener('input', updateOfferPrice);
  timeIn.addEventListener('input', updateCheckTime);
  timeOut.addEventListener('input', updateCheckTime);
}

//Обработчик события submit
const submitAdForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    postData(POST_DATA_URL, formData)
      .then( () => showModal(newSuccessModal))
      .catch( () => showModal(newErrorModal));
  });
}

submitAdForm();

export { setFormInputHandlers, getPageInactive, getPageActive, adFormAddress, adForm, TypeToPrice, adPrice, adType }
