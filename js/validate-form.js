import { adForm } from './form.js';

const PRICE_PER_NIGHT_MAX = 1000000;

const TitleLength = {
  MIN: 30,
  MAX: 100,
}

const TypeToPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

const NotForGuestType = {
  ROOM: '100',
  GUEST: '0',
}

const adTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

// Подстановка мин стоимости по типу жилья
const updateOfferPrice = () => {
  adPrice.placeholder = TypeToPrice[adType.value];
  adPrice.min = TypeToPrice[adType.value];
};

// Подстановка времени выезда по вермени заезда
const updateCheckTime = (evt) => {
  const timeSelected = evt.target.value;
  switch (evt.target) {
    case timeIn:
      timeOut.value = timeSelected;
      break;
    case timeOut:
      timeIn.value = timeSelected;
      break;
  }
};

//Обработчики событий
// const setFormInputHandlers = () => {
//   adForm.addEventListener('input', updateOfferPrice);
//   adForm.addEventListener('input', updateCheckTime);
// }

//Проверка соответствия комнаты - гости
const roomToGuest = (rooms, guests) => {
  if(rooms === NotForGuestType.ROOM && guests !== NotForGuestType.GUEST) {
    capacity.setCustomValidity('Не для гостей');
  } else if (guests === NotForGuestType.GUEST && rooms !== NotForGuestType.ROOM) {
    capacity.setCustomValidity('100 комнат');
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
const setFormHandlers = () => {
  adTitle.addEventListener('input', checkTitleInput);
  adPrice.addEventListener('input', checkOfferPrice);
  capacity.addEventListener('input', checkGuests);
  roomNumber.addEventListener('input', checkRooms);
  adForm.addEventListener('input', updateOfferPrice);
  adForm.addEventListener('input', updateCheckTime);
};

export { setFormHandlers }
