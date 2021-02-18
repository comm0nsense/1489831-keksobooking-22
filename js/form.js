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
typeSelect.addEventListener('input', updateOfferPrice);
timeInSelect.addEventListener('input', updateCheckTime);
timeOutSelect.addEventListener('input', updateCheckTime);

export { updateOfferPrice, updateCheckTime }
