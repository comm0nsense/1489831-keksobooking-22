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

getRandomInt(36, 25);
getRandomFloat(1.1, 1.2, 4);


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
}

export {getRandomInt, getRandomFloat, shuffleArray};
