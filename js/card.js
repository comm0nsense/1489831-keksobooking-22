import { offers } from './mock.js';

//Контейнер для карточек
const cardContainer = document.querySelector('#map-canvas');

//Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');

// Создание мапа по типам жилья
const typeMap = new Map([
  ['palace', 'Дворец' ],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

//Создаем карточку
const createCard = () => {
  const newCard = newCardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = offers[1].offer.title;
  newCard.querySelector('.popup__text--address').textContent = offers[1].offer.address;
  newCard.querySelector('.popup__text--price').textContent = `${offers[1].offer.price} ₽/ночь`;
  newCard.querySelector('.popup__type').textContent = typeMap.get(offers[1].offer.type);
  newCard.querySelector('.popup__text--capacity').textContent = `${offers[1].offer.rooms} комнаты для ${offers[1].offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${offers[1].offer.checkin}, выезд до ${offers[1].offer.checkout}`;

  //Создаем список features
  const featuresList = newCard.querySelector('.popup__features');
  featuresList.innerHTML = ''
  const features = offers[1].offer.features;

  if (features.length === 0) {
    featuresList.remove();
  }

  features.forEach((feature) => {
    const addFeature = document.createElement('li');
    addFeature.classList.add('popup__feature');
    addFeature.classList.add('popup__feature--' + feature);
    featuresList.appendChild(addFeature);
  });

  newCard.querySelector('.popup__description').textContent = offers[1].offer.description;

  //Созадем фотографии жилья
  const photosList =  newCard.querySelector('.popup__photos');
  const photo = photosList.querySelector('.popup__photo');
  const offerPhotos =  offers[1].offer.photos;
  photo.remove();

  if (offerPhotos.length === 0) {
    photosList.remove();
  }

  offerPhotos.forEach((offerPhoto) => {
    const img = photo.cloneNode(false);
    img.src = offerPhoto;
    photosList.appendChild(img);
  });

  newCard.querySelector('.popup__avatar').src = offers[0].author.avatar;

  cardContainer.appendChild(newCard);
}

createCard();
