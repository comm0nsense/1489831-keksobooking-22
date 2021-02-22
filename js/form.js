//Константы
const TypeMinPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
}

//Форма и поля ввода карточки
const newCardForm = document.querySelector('.ad-form');
const priceInput = newCardForm.querySelector('#price');
const typeSelect = newCardForm.querySelector('#type');
const timeInSelect = newCardForm.querySelector('#timein');
const timeOutSelect = newCardForm.querySelector('#timeout');
const adFormHeader = newCardForm.querySelector('.ad-form-header');
const adFormElements = newCardForm.querySelectorAll('.ad-form__element');

//Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const mapFiltersIds = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

// Подстановка мин стоимости по типу жилья
const updateOfferPrice = () => {
  priceInput.placeholder = TypeMinPrice[typeSelect.value];
  priceInput.min = TypeMinPrice[typeSelect.value];
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

//Обработчики событий
const setFormInputHandlers = () => {
  typeSelect.addEventListener('input', updateOfferPrice);
  timeInSelect.addEventListener('input', updateCheckTime);
  timeOutSelect.addEventListener('input', updateCheckTime);
}

//Делает форму объявления и все поля неактивными/активными
const getAdFormInactive = () => {
  newCardForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  adFormElements.forEach(formElement => formElement.disabled = true);
};

const getAdFormActive = () => {
  newCardForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  adFormElements.forEach(formElement => formElement.disabled = false);
};

// Делает фильтрацию объявлений и все поля неактивными/активными
const getMapFiltersInactive = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = true);
  mapFeatures.disabled = true;
};

const getMapFiltersActive = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = false);
  mapFeatures.disabled = false;
};

const inactivatePageState = () => {
  getAdFormInactive();
  getMapFiltersInactive();
};

const activatePageState = () => {
  getAdFormActive();
  getMapFiltersActive();
};

export { setFormInputHandlers, inactivatePageState, activatePageState }
