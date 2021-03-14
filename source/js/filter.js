/* global _:readonly */
import { createMarkers, removeMarkers } from './map.js';

const MAX_ADS_COUNT = 10;
const ANY_FILTER = 'any';
const RERENDER_DELAY = 500;

const priceToRange = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: 999999,
  },
};

const mapFilters = document.querySelector('.map__filters');
const housingFilters = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');

const disableFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  housingFilters.forEach(mapFilterId => mapFilterId.disabled = true);
  mapFeatures.disabled = true;
};

const enableFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  housingFilters.forEach(mapFilterId => mapFilterId.disabled = false);
  mapFeatures.disabled = false;
};

const resetFilters = () => {
  mapFilters.reset();
};

const setFilterHandler = (ads) => {
  let adType = housingType.value;
  let adPrice = housingPrice.value;
  let adRooms = housingRooms.value;
  let adGuests = housingGuests.value;
  let adFeatures = [];

  const filterType = ad => adType === ANY_FILTER ? true : ad.offer.type === adType;
  const filterRooms = ad => adRooms === ANY_FILTER ? true : ad.offer.rooms === +adRooms;
  const filterGuests = ad => (adGuests === ANY_FILTER ? true : ad.offer.guests === +adGuests);
  const filterPrice = ad => adPrice === ANY_FILTER ? true :
    priceToRange[adPrice].MIN <= ad.offer.price && priceToRange[adPrice].MAX >= ad.offer.price;

  const filterFeatures = (ad) => {
    for (let i = 0; i <= adFeatures.length - 1; i++) {

      if (!ad.offer.features.includes(adFeatures[i])) {
        return false;
      }
    }

    return true;
  };


  const onFilterChange = (evt) => {
    if (evt.target.id === housingType.id) {
      adType = evt.target.value;
    } else if (evt.target.id === housingPrice.id) {
      adPrice = evt.target.value;
    } else if (evt.target.id === housingRooms.id) {
      adRooms = evt.target.value;
    } else if (evt.target.id === housingGuests.id) {
      adGuests = evt.target.value;
    } else if (evt.target.id === ('filter-' + evt.target.value)) {
      adFeatures = Array.from(mapFeatures.querySelectorAll('input:checked')).map((feature) => feature.value);
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

  mapFilters.addEventListener('change', _.debounce(onFilterChange, RERENDER_DELAY));
};

export {
  enableFilters,
  disableFilters,
  mapFilters,
  setFilterHandler,
  resetFilters,
  MAX_ADS_COUNT
};
