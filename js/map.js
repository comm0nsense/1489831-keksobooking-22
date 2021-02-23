import { activatePageState, adFormAddress } from './form.js';
import { offers, createCard } from './card.js';

const TOKYO_CENTER_X = 35.6804;
const TOKYO_CENTER_Y = 139.759;
const MAP_SCALE = 12;

/* global L:readonly */

//Рисуем карту
const map = L.map('map-canvas')
  .on('load', () => {
    activatePageState();
    // console.log('Карта инициализирована');
  })
  .setView({
    lat: TOKYO_CENTER_X,
    lng: TOKYO_CENTER_Y,
  }, MAP_SCALE);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Главная метка
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.6804,
    lng: 139.759,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

marker.on('moveend', (evt) => {
  adFormAddress.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
});

//Обычные метки для объявлений
const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

offers.forEach((offer) => {
  // console.log('test');
  // console.log(createCard(offer));
  const marker = L.marker(
    {
      lat: offer.location.x,
      lng: offer.location.y,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCard(offer),
      {
        keepInView: true,
      },
    );
});

export { map }
