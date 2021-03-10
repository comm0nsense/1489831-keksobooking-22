import { createMarkers, removeMarkers } from './map.js'

const MAX_ADS_COUNT = 10;
const ANY_FILTER_SELECTED = 'any';

//Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const housingFilters = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const featuresSelect = mapFilters.querySelectorAll('.map__checkbox');

const housingType = mapFilters.querySelector('#housing-type');

// console.log(housingType.value)
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');


//фильтрация объявлений - активация
const disableFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  housingFilters.forEach(mapFilterId => mapFilterId.disabled = true);
  mapFeatures.disabled = true;
};

//деактивация фильтров
const enableFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  housingFilters.forEach(mapFilterId => mapFilterId.disabled = false);
  mapFeatures.disabled = false;
};

//Сброс фильтров
const resetFilters = () => {
  mapFilters.reset();
}

//****************8.2 *************///////////
// console.log(featuresSelect);
const featuresSelectArr = Array.from(featuresSelect);
// console.log(featuresSelectArr);
const result = featuresSelectArr.map((feature) => feature.value);
console.log(result);
const adFeatures = mapFilters.querySelectorAll('input:checked');
const adFeaturesArr = Array.from(adFeatures);
const adFeaturesSelected = adFeaturesArr.map((feature) => { feature.value });


const setFilterHandler = (ads) => {
  //получаем текущие значение фильтров
  let adType = housingType.value;
  let adPrice = housingPrice.value;
  let adRooms = housingRooms.value;
  let adGuests = housingGuests.value;

  const filterType = (ads, filter) => {
    if (filter === ANY_FILTER_SELECTED) {
      return ads.slice();
    } else {
      const adsCopy = ads.slice();
      return adsCopy.filter(ad => ad.offer.type === filter);
    }
  };

  const filterRooms = (ads, filter) => {
    if (filter === ANY_FILTER_SELECTED) {
      return ads.slice();
    } else {
      const adsCopy = ads.slice();
      console.log('фильтр это:', typeof(+filter));
      return adsCopy.filter (ad => {
        let roomNumber = ad.offer.rooms;
        console.log(`кол-во комнат ${roomNumber} это тип`, typeof(roomNumber));
        ad.offer.rooms === +filter;
      });
    }
  }

  const onFilterChange = (evt) => {
    const selectedFilter = evt.target.id
    console.log(`клик по фильтру: ${selectedFilter}`)

    //изменяем значение при клике на фильтр
    if (selectedFilter === housingType.id) {
      adType = evt.target.value;
      console.log(`выбранный типа жилья: ${adType}`);
    } else if (selectedFilter === housingPrice.id) {
      adPrice = evt.target.value;
      console.log(`выбранный диапазон цены: ${adPrice}`);
    } else if (selectedFilter === housingRooms.id) {
      adRooms = evt.target.value;
      console.log(`количество комнат: ${adRooms}`);
    } else if (selectedFilter === housingGuests.id) {
      adGuests = evt.target.value;
      console.log(`количество гостей: ${adGuests}`)
    }
    // const selectedFilter = evt.target.value;
    // console.log(selectedFilter);
    // const filteredAds = filterType(ads, adType);
    const filteredAds = filterRooms(ads, adRooms);
    // const filteredAds = ads
      // .filter(ad => ad.offer.type === adType)
      // .filter(ad => ad.offer.rooms === adRooms);
    removeMarkers();
    createMarkers(filteredAds)
  }

  mapFilters.addEventListener('change', onFilterChange);
};

export {
  enableFilters,
  disableFilters,
  mapFilters,
  setFilterHandler,
  resetFilters,
  MAX_ADS_COUNT
}
