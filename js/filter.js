import { mapFilters } from './form.js'

const housingType = mapFilters.querySelector('#housing-type');

housingType.addEventListener('change', () => { console.log('перерисовка Пинов исходя из фильтра') });

const onFilterHousingType = (ads) => {
  return (evt) => {
    const housingType = evt.target.value;

  }
}
