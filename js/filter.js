import { createMarkers, removeMarkers } from './map.js'

const MAX_ADS_COUNT = 10;
const ANY_FILTER = 'any';

const priceToRange = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

//Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const housingFilters = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const featuresSelect = mapFilters.querySelectorAll('.map__checkbox');

const housingType = mapFilters.querySelector('#housing-type');
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
};

const setFilterHandler = (ads) => {
  //получаем текущие значение фильтров
  let adType = housingType.value;
  let adPrice = housingPrice.value;
  let adRooms = housingRooms.value;
  let adGuests = housingGuests.value;
  let adFeatures = Array.from(featuresSelect).map((feature) => feature.value);

  //
  const filterType = ad => adType === ANY_FILTER ? true : ad.offer.type === adType;
  const filterRooms = ad => adRooms === ANY_FILTER ? true : ad.offer.rooms === +adRooms;
  const filterGuests = ad => (adGuests === ANY_FILTER ? true : ad.offer.guests === +adGuests);
  const filterPrice = ad => adPrice === ANY_FILTER ? true :
    priceToRange[adPrice].min <= ad.offer.price && priceToRange[adPrice].max >= ad.offer.price;
  const filterFeatures = ad => adFeatures.every(feature =>  ad.offer.features.includes(feature));


  const onFilterChange = (evt) => {
    const selectedFilter = evt.target.id

    //изменяем значение при клике на фильтр
    if (selectedFilter === housingType.id) {
      adType = evt.target.value;
    } else if (selectedFilter === housingPrice.id) {
      adPrice = evt.target.value;
    } else if (selectedFilter === housingRooms.id) {
      adRooms = evt.target.value;
    } else if (selectedFilter === housingGuests.id) {
      adGuests = evt.target.value;
    }
    else if (selectedFilter === ('filter-' + evt.target.value)) {
      adFeatures = Array.from(mapFilters.querySelectorAll('input:checked')).map((feature) => feature.value);
    }

    const filteredAds = ads
      .filter(filterType)
      .filter(filterRooms)
      .filter(filterGuests)
      .filter(filterPrice)
      .filter(filterFeatures);

    const slicedFilteredAds = filteredAds.slice(0, MAX_ADS_COUNT);
    removeMarkers();
    createMarkers(slicedFilteredAds);
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
