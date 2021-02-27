import { createOffers } from  './mock.js';
import { setFormInputHandlers, getPageInactive} from './form.js';
import { getMap, getPins } from './map.js';
import { setFormValidationHandlers } from './validate-form.js';

// Создание массива тестовых данных
const offers = createOffers();

//Делаем страницу неактивной
getPageInactive();

//Рисуем карту и пины
const map = getMap();
getPins(map, offers);

//Обработчики формы
setFormInputHandlers();
setFormValidationHandlers();

