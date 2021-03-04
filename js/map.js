/* global L:readonly */

import { getPageActive, adFormAddress } from './form.js';
import { createCard } from './card.js';

const COORDINATE_DECIMALS_COUNT = 5;
const MAP_SCALE = 10;
const OPENSTREETMAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OPENSTREETMAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const PIN_ICON_URL = 'img/pin.svg';

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
    OPENSTREETMAP_URL,
    {
      attribution: OPENSTREETMAP_COPYRIGHT,
    },
  ).addTo(map);

  return map;
};

//Рисуем главную метку
const getMainPin = (map) => {
  //Главная метка
  const mainPinIcon = L.icon({
    iconUrl: MAIN_PIN_ICON_URL,
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

  return marker;
};


//Рисуем обычные метки для объявлений
const getPins = (map, offers) => {
  const pinIcon = L.icon({
    iconUrl: PIN_ICON_URL,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
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


export { getPins, getMap, getMainPin, TokyoCenterCoordinates, MAP_SCALE }
