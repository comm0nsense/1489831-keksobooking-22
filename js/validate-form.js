import { adForm, TypeToPrice, adPrice, adType } from './form.js';

const TitleLength = {
  MIN: 30,
  MAX: 99,
}

const PRICE_PER_NIGHT_MAX = 1000000;

const adTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');


//Проверка соответствия комнаты - гости
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

const checkRooms = (evt) => {
  const rooms = evt.target.value;
  const guests = evt.target.options.selectedIndex;
  roomToGuest(rooms, guests);
};

const checkGuests = (evt) => {
  const guests = evt.target.value;
  const rooms = evt.target.options.selectedIndex;
  roomToGuest(rooms, guests);
};


//Проверка заголовка объявления
const checkTitleInput = () => {
  const titleLength = adTitle.value.length;

  if (titleLength < TitleLength.MIN) {
    adTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleLength > TitleLength.MAX) {
    adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    adTitle.setCustomValidity('');
  }
  adTitle.reportValidity();
};


//Проверка цены предложения
const checkOfferPrice = () => {
  const price = adPrice.value;
  const minPrice = TypeToPrice[adType.value];

  if (price < minPrice) {
    adPrice.setCustomValidity(`Стоимость не должна быть ниже ${TypeToPrice[adType.value]}`);
  } else if (price > PRICE_PER_NIGHT_MAX) {
    adPrice.setCustomValidity(`Стоиомость не должна превышать ${PRICE_PER_NIGHT_MAX}`);
  } else {
    adPrice.setCustomValidity('');
  }
  adPrice.reportValidity();
};


//Обработчики событий
const setFormValidationHandlers = () => {
  adTitle.addEventListener('input', checkTitleInput);
  adPrice.addEventListener('input', checkOfferPrice);
  capacity.addEventListener('input', checkGuests);
  roomNumber.addEventListener('input', checkRooms);
};

export { setFormValidationHandlers }
