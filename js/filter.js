import { createMarkers, removeMarkers } from './map.js'

const MAX_ADS_COUNT = 10;

//Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const mapFiltersIds = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const housingType = mapFilters.querySelector('#housing-type');
const anyFilterSelected = 'any';

//фильтрация объявлений - активация
const disableFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = true);
  mapFeatures.disabled = true;
};

//деактивация фильтров
const enableFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersIds.forEach(mapFilterId => mapFilterId.disabled = false);
  mapFeatures.disabled = false;
};

//Сброс фильтров
const resetFilters = () => {
  mapFilters.reset();
}

const setFilterHandler = (ads) => {

  const getFilteredAds = (ads, filter) => {
    let filteredAds = []

    if (filter === anyFilterSelected) {
      return filteredAds = ads.slice();
    } else {
      const adsCopy = ads.slice();
      adsCopy.forEach(ad => {
        // console.log(ad.offer.type);
        if (ad.offer.type === filter) {
          filteredAds.push(ad);
        }
      });
      // console.log(`фильтер по типу: ${filter}`);
      // console.log('Все объявления по выбранному типу: ', filteredAds);
      return filteredAds.slice(0, MAX_ADS_COUNT);
    }
  };

  const onFilterChange = (evt) => {
    const selectedFilter = evt.target.value;
    // console.log(selectedFilter);
    const filteredAds = getFilteredAds(ads, selectedFilter);
    // console.log(result);
    // return result;
    removeMarkers();
    createMarkers(filteredAds)
  }

  housingType.addEventListener('change', onFilterChange);
};

export {
  enableFilters,
  disableFilters,
  mapFilters,
  setFilterHandler,
  resetFilters
}
