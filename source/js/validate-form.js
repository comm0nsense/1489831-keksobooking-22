import { adForm} from './form.js';

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
};

const adTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const resetDefaultAdPrice = () => {
  const adTypeSelected = adType.value;
  const adTypeSelectedPrice = TypeToPrice[adTypeSelected]
  adPrice.placeholder = `${adTypeSelectedPrice}`;
};

const onTypeSelect = () => {
  adPrice.placeholder = TypeToPrice[adType.value];
  adPrice.min = TypeToPrice[adType.value];
};

const onTimeSelect = (evt) => {
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

const roomToGuest = (rooms, guests) => {
  if (rooms === NotForGuestType.ROOM && guests !== NotForGuestType.GUEST) {
    capacity.setCustomValidity('Не для гостей');
  } else if (guests === NotForGuestType.GUEST && rooms !== NotForGuestType.ROOM) {
    capacity.setCustomValidity(`${NotForGuestType.ROOM} комнат`);
  } else if (rooms < guests) {
    capacity.setCustomValidity(`Гостей (${guests}) больше чем свободных комнат (${rooms})`);
  } else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

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


const onRoomSelect = (evt) => {
  const rooms = evt.target.value;
  const guests = getOptionSelected(capacityOptions);
  roomToGuest(rooms, guests);
};

const onGuestSelect = (evt) => {
  const guests = evt.target.value;
  const rooms = getOptionSelected(roomOptions);
  roomToGuest(rooms, guests);
};

const onTitleInput = () => {
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


const onPriceInput = () => {
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


const setFormHandlers = () => {
  adTitle.addEventListener('input', onTitleInput);
  adPrice.addEventListener('input', onPriceInput);
  capacity.addEventListener('input', onGuestSelect);
  roomNumber.addEventListener('input', onRoomSelect);
  adForm.addEventListener('input', onTypeSelect);
  adForm.addEventListener('input', onTimeSelect);
};

export { setFormHandlers, resetDefaultAdPrice };
