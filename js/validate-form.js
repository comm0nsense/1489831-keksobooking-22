import { adForm, TypeToPrice, adPrice, adType } from './form.js';

const PRICE_PER_NIGHT_MAX = 1000000;

const TitleLength = {
  MIN: 30,
  MAX: 100,
}

const NotForGuestType = {
  ROOM: 100,
  GUEST: 0,
}

const adTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');


//Проверка соответствия комнаты - гости
const roomToGuest = (rooms, guests) => {
  if(rooms === NotForGuestType.ROOM && guests !== NotForGuestType.GUEST) {
    capacity.setCustomValidity('Не для гостей');
  } else if (guests === NotForGuestType.GUEST && rooms !== NotForGuestType.ROOM) {
    capacity.setCustomValidity('Не для гостей');
  } else if (rooms < guests) {
    capacity.setCustomValidity(`Гостей (${guests}) больше чем свободных комнат (${rooms})`);
  } else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

//test
const capacityOptions = capacity.querySelectorAll('option');
const roomOptions = roomNumber.querySelectorAll('option');

const getOptionSelected = (options) => {
  let result = 0;

  options.forEach((option) => {
    if (option.selected) {
      result = option.value;
    }
  })

  return result;
};
//end of test

const checkRooms = (evt) => {
  const rooms = evt.target.value;
  // const guests = evt.target.options.selectedIndex;
  const guests = getOptionSelected(capacityOptions);
  roomToGuest(rooms, guests);
};

const checkGuests = (evt) => {
  const guests = evt.target.value;
  // const rooms = evt.target.options.selectedIndex;
  const rooms = getOptionSelected(roomOptions);
  roomToGuest(rooms, guests);
};


//Проверка заголовка объявления
const checkTitleInput = () => {
  const titleLength = adTitle.value.length;

  if (titleLength < TitleLength.MIN) {
    adTitle.setCustomValidity(`Заголовок должен состоять минимум из ${TitleLength.MIN} символов`);
  } else if (titleLength >= TitleLength.MAX) {
    adTitle.setCustomValidity(`Заголовок не должен превышать ${TitleLength.MAX} символов`);
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
