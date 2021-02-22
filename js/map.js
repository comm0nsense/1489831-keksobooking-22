import { activatePageState } from './form.js';

const TOKYO_CENTER_X = 35.6804;
const TOKYO_CENTER_Y = 139.759;
const MAP_SCALE = 10;

const map = L.map('map-canvas')
  .on('click', () => {
    activatePageState();
    console.log('Карта инициализирована');
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

export { map }
