import { createOffers } from  './mock.js';
import { setFormInputHandlers, getPageInactive} from './form.js';
import { getMap, getPins } from './map.js';
import './validate-form.js';

// Создание массива тестовых данных
const offers = createOffers();

//Делаем страницу неактивной
getPageInactive();

// getPageActive();

//Рисуем карту и пины
const map = getMap();
getPins(map, offers);

//Обработчики по изменению в форме typeToPrice & checkin-checkout time
setFormInputHandlers();



