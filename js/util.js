const ALERT_SHOW_TIME = 5000;

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (min, max, decimal = 1) => {
  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }

  const randomFloat = Math.random() * (max - min) + min;

  return Number(randomFloat.toFixed(decimal));
}


const shuffleArray = (array) => {
  let curId = array.length;

  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }

  return array;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInt, getRandomFloat, shuffleArray, showAlert };
