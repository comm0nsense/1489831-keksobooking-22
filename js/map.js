/* global L:readonly */

import { getPageActive, adFormAddress } from './form.js';
import { createCard } from './card.js';

const COORDINATE_DECIMALS_COUNT = 5;
const MAP_SCALE = 10;
const OPENSTREETMAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OPENSTREETMAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const PIN_ICON_URL = 'img/pin.svg';
const PIN_WIDTH = 52;
const PIN_HEIGHT = 52;

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
      lat: DefaultCoordinates.X,
      lng: DefaultCoordinates.Y,
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
    iconSize: [PIN_WIDTH, PIN_HEIGHT],
    iconAnchor: [PIN_WIDTH / 2 , PIN_HEIGHT],
  });

  const marker = L.marker(
    {
      lat: DefaultCoordinates.X,
      lng: DefaultCoordinates.Y,
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
    iconSize: [PIN_WIDTH, PIN_HEIGHT],
    iconAnchor: [PIN_WIDTH / 2 , PIN_HEIGHT],
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


export { getPins, getMap, getMainPin, DefaultCoordinates, MAP_SCALE }
