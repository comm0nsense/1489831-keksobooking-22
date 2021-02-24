import { createOffers } from  './mock.js';
import { setFormInputHandlers, inactivatePageState} from './form.js';
import { getMap, getPins } from './map.js';

// Создание массива тестовых данных
const offers = createOffers();

//Обработчики по изменению в форме typeToPrice & checkin-checkout time
setFormInputHandlers();

//Делаем страницу неактивной
inactivatePageState();

// Рисуем карту и пины
const map = getMap();
getPins(map, offers);



