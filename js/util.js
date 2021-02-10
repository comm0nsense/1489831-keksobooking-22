const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Range must be positive');
  }
  min = Math.ceil(+min);
  max = Math.floor(+max);
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

// console.log(getRandomInt(24, 25));
// for (let i = 0; i < 21; i++) {
// console.log(getRandomFloat(1.2, 1.1, 4));
// }

export {getRandomInt, getRandomFloat};
