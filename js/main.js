'use strict';

function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  min = Math.ceil(+min);
  max = Math.floor(+max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimal = 1) {
  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  const randomFloat = Math.random() * (max - min) + min;
  return Number(randomFloat.toFixed(decimal));
}

getRandomInt(36, 25);
getRandomFloat(1.1, 1.2, 4);


function createAuthor() {
  return {
    avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
  };
}

const OBJECTS_COUNT = 10;

const authors = new Array(OBJECTS_COUNT).fill(null).map(() => createAuthor());

authors;

function createLocation() {
  return {
    x: getRandomFloat(35.65000, 35.70000, 5),
    y: getRandomFloat(139.70000, 139.80000, 5),
  }
}

const locations = new Array(OBJECTS_COUNT).fill(null).map(() => createLocation());

const TITLES = [
  'Милая уютная квартирка в центре Токио',
  'Комфортная студия в центре Токио',
  'Студия в стиле fusion в 5 минутах от центрального вокзала Токио',
  'Большая светлая 2-комнатная квартира в центре Токио рядом с метро',
  'Крутой лофт в центре Токио',
  'Уютный хостел в центре Токио',
  'Квартира-студия с балконом в центре Токио',
  'Роскошный пентхаус в центре Токио',
  'Петнахус с панорамными видами на центр Токио',
  'Просторая квартира с 2 спальнями в самом центре Токио',
]

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
]

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const DESCRIPTIONS = [
  'Коплекс расположен в районе Ота города Токио, недалеко от храма Омори Хачиман. В апартаментах предоставляется бесплатный Wi-Fi и установлена стиральная машина. ',
  'Комплекс Oakwood Nishi-Shinjuku расположен в 500 м от храма Дзёэнджи. К услугам гостей апартаменты с балконом и бесплатным Wi-Fi. ',
  'Комплекс Studio Inn Nishi Shinjuku расположен в 400 м от храма Шогонджи в Токио. К услугам гостей номера с кондиционером и бесплатным Wi-Fi. ',
  'Апартаменты Universal Haneda расположены в Токио, в 6 км от смотровой площадки терминала No2 международного аэропорта Токио и в 10 км от сада. К услугам гостей бесплатный Wi-Fi. ',
  'Апартаменты M-1 Tokyo Higashikojiya расположены в Токио. К услугам гостей бесплатный Wi-Fi и мини-кухня. Соотношение цена качество',
  'Роскошные апартаменты с гостиничным обслуживанием комплекса Oakwood Premier Tokyo расположены всего в 2 минутах ходьбы от выхода Yaesu North с вокзала JR Токио. ',
  'Апартаменты Universal Haneda расположены в Токио, в 6 км от смотровой площадки терминала No2 международного аэропорта Токио и в 10 км от сада. К услугам гостей бесплатный Wi-Fi. ',
  'Апартаменты J Court Oshiage с кондиционером и бесплатным Wi-Fi расположены в 400 м от телевизионной башни Tokyo Skytree в Токио. ',
  'Комплекс Section L Ginza East расположен в Токио. К услугам гостей апартаменты с бесплатным Wi-Fi, гостиным уголком и кухней. ',
  'Апартаменты Kario Kamata с видом на город расположены в Токио, в 2 км от храма Омори Хачиман и в 2,2 км от святилища Мива-Ицукусим. Апартаменты оснащены кондиционеромю',
]

function shuffleArray(array) {
  let curId = array.length;
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

function getFeatureSet() {
  const FEATURE_COUNT = getRandomInt(1, FEATURES.length);
  let featureSet = [];
  let shuffledFeatures = shuffleArray(FEATURES);
  for (let i = 0; i <= FEATURE_COUNT - 1; i++) {
    featureSet.push(shuffledFeatures[i]);
  }
  return featureSet;
}

function getPhotoSet() {
  const PHOTO_COUNT = getRandomInt(1, 10);
  let photoSet = [];
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photoSet.push('http://o0.github.io/assets/images/tokyo/hotel' + [i] + '.jpg')
  }
  return photoSet;
}

function createOffer() {
  return {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    address: locations[getRandomInt(0, locations.length - 1)],
    price: getRandomInt(500, 15000),
    type: TYPES[getRandomInt(0, TYPES.length - 1)],
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: CHECKINS[getRandomInt(0, CHECKINS.length - 1)],
    checkout: CHECKOUTS[getRandomInt(0, CHECKINS.length - 1)],
    features: getFeatureSet(),
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
    photos: getPhotoSet(),
  }
}

const offers = new Array(OBJECTS_COUNT).fill(null).map(() => createOffer());

offers;
