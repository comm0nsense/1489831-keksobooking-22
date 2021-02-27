//Константы


const TypeToPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};


//Форма и поля ввода карточки
const newCardForm = document.querySelector('.ad-form');
const priceInput = newCardForm.querySelector('#price');
const typeSelect = newCardForm.querySelector('#type');
const timeInSelect = newCardForm.querySelector('#timein');
const timeOutSelect = newCardForm.querySelector('#timeout');
const adFormAddress = newCardForm.querySelector('#address');
const adFormHeader = newCardForm.querySelector('.ad-form-header');
const adFormElements = newCardForm.querySelectorAll('.ad-form__element');

//Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const mapFiltersIds = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

//Делает форму объявления и фильтрацию неактивными
const getPageInactive = () => {
  //форма объявления
  newCardForm.classList.add('ad-form--disabled');
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
  priceInput.placeholder = TypeToPrice[typeSelect.value];
  priceInput.min = TypeToPrice[typeSelect.value];
};


// Подстановка времени выезда по вермени заезда
const updateCheckTime = (evt) => {
  switch (evt.target) {
    case timeInSelect:
      timeOutSelect.value = evt.target.value;
      break;
    case timeOutSelect:
      timeInSelect.value = evt.target.value;
      break;
  }
};


//Делаем страницу активной и подключаем проверки
const getPageActive = () => {
  newCardForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  adFormElements.forEach(formElement => formElement.disabled = false);

  //фильтрация
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = false);
  mapFeatures.disabled = false;
};

//Обработчики событий
const setFormInputHandlers = () => {
  typeSelect.addEventListener('input', updateOfferPrice);
  timeInSelect.addEventListener('input', updateCheckTime);
  timeOutSelect.addEventListener('input', updateCheckTime);
}

export { setFormInputHandlers, getPageInactive, getPageActive, adFormAddress, newCardForm, TypeToPrice, priceInput, typeSelect }
