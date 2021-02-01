function getRandomNumber(min, max) {
  min = Math.abs(+min);
  max = Math.abs(+max);
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  return Math.random() * (max - min + 1) + min;
}

function getRandomInt(min, max) {
  const randomInt = getRandomNumber (min, max);
  return Math.floor(randomInt);
}

function getRandomFloat(min, max, decimal = 2) {
  const randomFloat = getRandomNumber(min,  max);
  return Number(randomFloat.toFixed(decimal));
}

getRandomNumber(32.1324354, 0);
getRandomInt(32.1324354, 0);
getRandomFloat(32.1324354, 0, 4);
