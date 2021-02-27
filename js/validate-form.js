import { newCardForm, TypeToPrice, priceInput, typeSelect } from './form.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 99;
const PRICE_PER_NIGHT_MAX = 1000000;

const adTitle = newCardForm.querySelector('#title');
const roomNumber = newCardForm.querySelector('#room_number');
const roomOptions = roomNumber.querySelectorAll('option');
const capacity = newCardForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');


const roomToGuest = (rooms, guests) => {

  if(rooms === '100' && guests !== '0') {
    capacity.setCustomValidity('Не для гостей');
  } else if (guests === '0' && rooms !== '100') {
    capacity.setCustomValidity('Не для гостей');
  } else if (rooms < guests) {
    capacity.setCustomValidity(`Гостей (${guests}) больше чем свободных комнат (${rooms})`);
  } else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

const getOptionSelected = (options) => {
  let result = 0;

  options.forEach((option) => {
    if (option.selected) {
      result = option.value;
    }
  })

  return result;
};

const checkRooms = (evt) => {
  const rooms = evt.target.value;
  const guests = getOptionSelected(capacityOptions);
  roomToGuest(rooms, guests);
};

const checkGuests = (evt) => {
  const guests = evt.target.value;
  const rooms = getOptionSelected(roomOptions);
  roomToGuest(rooms, guests);
};

//Проверка заголовка объявления
const checkTitleInput = () => {
  const titleLength = adTitle.value.length;

  if (titleLength < TITLE_MIN_LENGTH) {
    adTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleLength > TITLE_MAX_LENGTH) {
    adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    adTitle.setCustomValidity('');
  }
  adTitle.reportValidity();
};


//Проверка цены предложения
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


//Обработчики событий
const setFormValidationHandlers = () => {
  adTitle.addEventListener('input', checkTitleInput);
  priceInput.addEventListener('input', checkOfferPrice);
  capacity.addEventListener('input', checkGuests);
  roomNumber.addEventListener('input', checkRooms);
};

setFormValidationHandlers();
