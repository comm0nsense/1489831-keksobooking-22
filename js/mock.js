import { getRandomInt, getRandomFloat, shuffleArray } from './util.js';

const OBJECTS_COUNT = 10;
const COORDINATE_DECIMALS_COUNT = 5;
const AVATAR_COUNT = 8;
const ROOMS_COUNT = 10;
const GUESTS_COUNT = 50;
const MAX_PHOTO_NUMBER = 3;

const PriceRange = {
  MIN: 500,
  MAX: 15000,
}

const Coordinates = {
  x: {
    MIN: 35.65,
    MAX: 35.7,
  },
  y: {
    MIN: 139.7,
    MAX: 139.8,
  },
}

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

const getAuthor = () => {
  return {
    avatar: `img/avatars/user0${getRandomInt(1, AVATAR_COUNT)}.png`,
  }
};

const getLocation = () => {
  return {
    x: getRandomFloat(Coordinates.x.MIN, Coordinates.x.MAX, COORDINATE_DECIMALS_COUNT),
    y: getRandomFloat(Coordinates.y.MIN, Coordinates.y.MAX, COORDINATE_DECIMALS_COUNT),
  }
}

const getFeatureSet = () => {
  const FEATURE_COUNT = getRandomInt(1, FEATURES.length);
  const featureSet = [];
  const shuffledFeatures = shuffleArray(FEATURES);

  for (let i = 0; i <= FEATURE_COUNT - 1; i++) {
    featureSet.push(shuffledFeatures[i]);
  }

  return featureSet;
}

const getPhotoSet = () => {
  const PHOTO_COUNT = getRandomInt(1, MAX_PHOTO_NUMBER);
  const photoSet = [];

  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photoSet.push(`http://o0.github.io/assets/images/tokyo/hotel${[i]}.jpg`);
  }

  return photoSet;
}

const createOffer = () => {
  const location = getLocation()

  return {
    author: getAuthor(),
    offer: {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      address: `${location.x}, ${location.y}`,
      price: getRandomInt(PriceRange.MIN, PriceRange.MAX),
      type: TYPES[getRandomInt(0, TYPES.length - 1)],
      rooms: getRandomInt(1, ROOMS_COUNT),
      guests: getRandomInt(1, GUESTS_COUNT),
      checkin: CHECKINS[getRandomInt(0, CHECKINS.length - 1)],
      checkout: CHECKOUTS[getRandomInt(0, CHECKINS.length - 1)],
      features: getFeatureSet(),
      description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
      photos: getPhotoSet(),
    },
    location: location,
  }
}

const offers = new Array(OBJECTS_COUNT).fill(null).map(() => createOffer());

export { offers };

