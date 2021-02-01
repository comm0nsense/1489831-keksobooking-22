'use strict';

function getRandomInt(min, max) {

  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  min = Math.ceil(+min);
  max = Math.floor(+max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimal = 1) {

  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  const randomFloat = Math.random() * (max - min) + min;

  return Number(randomFloat.toFixed(decimal));
}

getRandomInt(36, 25);
getRandomFloat(1.1, 1.2, 4);
