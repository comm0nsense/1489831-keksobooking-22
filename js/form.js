//Константы
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 30;
const PRICE_PER_NIGHT_MAX = 1000000;

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
const titleInput = newCardForm.querySelector('#title');
const roomNumber = newCardForm.querySelector('#room_number');
const roomCapacity = newCardForm.querySelector('#capacity');

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

const checkOfferPrice = () => {

  const price = priceInput.value;
  const minPrice = TypeToPrice[typeSelect.value];

  if (price < minPrice) {
    priceInput.setCustomValidity(`Стоимость не должна быть ниже ${TypeToPrice[typeSelect.value]}`);
  } else if (price > PRICE_PER_NIGHT_MAX) {
    priceInput.setCustomValidity(`Стоиомость не должна превышать ${PRICE_PER_NIGHT_MAX}`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
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

const checkInputCapacity = (roomNumber, roomCapacity) => {
  const rooms = roomNumber.value;
  const guests = roomCapacity.value;
  console.log(`${rooms} rooms for ${guests} guests`);
  if (rooms == '1' && rooms !== guests) {
    roomCapacity.setCustomValidity('только для 1 гостя');
  } else {
    roomCapacity.setCustomValidity('');
  }
  roomCapacity.reportValidity();
}

checkInputCapacity(roomNumber, roomCapacity);

//Проверка заголовка объявления
const checkTitleInput = () => {
  const titleLength = titleInput.value.length;

  if (titleLength < TITLE_MIN_LENGTH) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleLength > TITLE_MAX_LENGTH) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
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
  titleInput.addEventListener('input', checkTitleInput);
  priceInput.addEventListener('input', checkOfferPrice);
  roomNumber.addEventListener('input', checkInputCapacity);
  roomCapacity.addEventListener('input', checkInputCapacity);
}

export { setFormInputHandlers, getPageInactive, getPageActive, adFormAddress }
