// /* global L:readonly */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { enableForm, adFormAddress } from './form.js';
import { createCard } from './card.js';
import { setFilterHandler, MAX_ADS_COUNT } from './filter.js'

const COORDINATE_DECIMALS_COUNT = 5;
const MAP_SCALE = 10;

const OpenStreetMapDetails = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const MarkerParameters = {
  MAIN_MARKER_ICON_URL: 'img/main-pin.svg',
  MARKER_ICON_URL: 'img/pin.svg',
  WIDTH: 52,
  HEIGHT: 52,
};

const TokyoCenterCoordinates = {
  X: 35.6804,
  Y: 139.759,
};

const DefaultCoordinates = {
  X: TokyoCenterCoordinates.X.toFixed(COORDINATE_DECIMALS_COUNT),
  Y: TokyoCenterCoordinates.Y.toFixed(COORDINATE_DECIMALS_COUNT),
};

const map = L.map('map-canvas')

//Параментры внешнего вида главной метки
const mainMarkerIcon = L.icon({
  iconUrl: MarkerParameters.MAIN_MARKER_ICON_URL,
  iconSize: [MarkerParameters.WIDTH, MarkerParameters.HEIGHT],
  iconAnchor: [MarkerParameters.WIDTH / 2, MarkerParameters.HEIGHT],
});

//Рисуем карту
const getMap = () => {
  map
    .on('load', () => {
      enableForm();
    })
    .setView({
      lat: DefaultCoordinates.X,
      lng: DefaultCoordinates.Y,
    }, MAP_SCALE);

  L.tileLayer(
    OpenStreetMapDetails.URL,
    {
      attribution: OpenStreetMapDetails.COPYRIGHT,
    },
  ).addTo(map);

  return map;
};

//инициализация карты + активация формы
// const openstreetMap = getMap();
const openstreetMap = getMap;


//сброс карты в исходное состояние
const resetMapView = () => {
  openstreetMap().setView({
    lat: DefaultCoordinates.X,
    lng: DefaultCoordinates.Y,
  }, MAP_SCALE);
}


//Рисуем Главную метку
const mainMarker = L.marker(
  {
    lat: DefaultCoordinates.X,
    lng: DefaultCoordinates.Y,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
).addTo(map);

//Перемещение главное метки
mainMarker.on('move', (evt) => {
  const lat = evt.target.getLatLng().lat.toFixed(COORDINATE_DECIMALS_COUNT);
  const lng = evt.target.getLatLng().lng.toFixed(COORDINATE_DECIMALS_COUNT);
  adFormAddress.value = `${lat}, ${lng}`;
});

const resetMainMarkerLatLng = () => {
  mainMarker.setLatLng([DefaultCoordinates.X, DefaultCoordinates.Y]);
}

//Параментры внешнего вида меток объявлений
const markerIcon = L.icon({
  iconUrl: MarkerParameters.MARKER_ICON_URL,
  iconSize: [MarkerParameters.WIDTH, MarkerParameters.HEIGHT],
  iconAnchor: [MarkerParameters.WIDTH / 2, MarkerParameters.HEIGHT],
});

const markers = [];

//Рисуем обычную метку для объявлений
const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: markerIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCard(ad),
      {
        keepInView: true,
      },
    );

  markers.push(marker);
};

const createMarkers = (ads) => {
  ads.forEach(ad => {
    createMarker(ad);
  });
};

const removeMarkers = () => {
  markers.forEach(marker => {
    marker.remove();
  });
};


let slicedAds = [];

//отрисовка маркеров
const renderMarkers = (ads) => {
  slicedAds = ads.slice(0, MAX_ADS_COUNT);
  createMarkers(slicedAds);
  setFilterHandler(ads);
}

export {
  getMap,
  DefaultCoordinates,
  createMarkers,
  removeMarkers,
  MAP_SCALE,
  resetMainMarkerLatLng,
  renderMarkers,
  slicedAds,
  resetMapView,
  openstreetMap
}
