/* global L:readonly */

import { getPageActive, adFormAddress } from './form.js';
import { createCard } from './card.js';
import { COORDINATE_DECIMALS_COUNT } from './mock.js';

const MAP_SCALE = 12;

const TokyoCenterCoordinates = {
  X: 35.6804,
  Y: 139.759,
}

const DefaultCoordinates = {
  X: TokyoCenterCoordinates.X.toFixed(COORDINATE_DECIMALS_COUNT),
  Y: TokyoCenterCoordinates.Y.toFixed(COORDINATE_DECIMALS_COUNT),
}

//Рисуем карту
const getMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      getPageActive();
      adFormAddress.value = `${DefaultCoordinates.X}, ${DefaultCoordinates.Y}`
    })
    .setView({
      lat: TokyoCenterCoordinates.X,
      lng: TokyoCenterCoordinates.Y,
    }, MAP_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map;
};


//Рисуем пины
const getPins = (map, offers) => {
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

  //Перемещение главное метки
  marker.on('move', (evt) => {
    adFormAddress.value = `${evt.target.getLatLng().lat.toFixed(COORDINATE_DECIMALS_COUNT)}, ${evt.target.getLatLng().lng.toFixed(COORDINATE_DECIMALS_COUNT)}`;
  });

  //Обычные метки для объявлений
  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  offers.forEach((offer) => {
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
}

export { getMap, getPins }
