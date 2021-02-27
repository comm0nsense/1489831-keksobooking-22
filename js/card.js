// Создание мапа по типам жилья
const typeMap = new Map([
  ['palace', 'Дворец' ],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);


//Контейнер для карточек
const cardContainer = document.querySelector('#map-canvas');

//Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');

//Создаем карточку
const createCard = (card) => {
  const newCard = newCardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = card.offer.title;
  newCard.querySelector('.popup__text--address').textContent = card.offer.address;
  newCard.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  newCard.querySelector('.popup__type').textContent = typeMap.get(card.offer.type);
  newCard.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  //Создаем список features
  const featuresList = newCard.querySelector('.popup__features');
  featuresList.innerHTML = ''
  const features = card.offer.features;

  if (features.length === 0) {
    featuresList.remove();
  }

  features.forEach((feature) => {
    const addFeature = document.createElement('li');
    addFeature.classList.add('popup__feature');
    addFeature.classList.add(`popup__feature--${feature}`);
    featuresList.appendChild(addFeature);
  });

  newCard.querySelector('.popup__description').textContent = card.offer.description;

  //Созадем фотографии жилья
  const photosList =  newCard.querySelector('.popup__photos');
  const photo = photosList.querySelector('.popup__photo');
  const offerPhotos =  card.offer.photos;
  photo.remove();

  if (offerPhotos.length === 0) {
    photosList.remove();
  }

  offerPhotos.forEach((offerPhoto) => {
    const img = photo.cloneNode(false);
    img.src = offerPhoto;
    photosList.appendChild(img);
  });

  newCard.querySelector('.popup__avatar').src = card.author.avatar;

  cardContainer.appendChild(newCard);

  return newCard;
}

export { createCard };
