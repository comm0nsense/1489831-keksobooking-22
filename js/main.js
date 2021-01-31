const getRandomIntInclusive = function (min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));
  if (min > max) {
    let swap = min;
    min = max;
    max = swap;
  }
  // console.log(min);
  // console.log(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(32.1324354, 0);
// let result = getRandomIntInclusive(32.1324354, 0);
// console.log(result);


// source
//https://www.jacklmoore.com/notes/rounding-in-javascript/

const round = function(min, max, decimals) {

  min = Math.abs(min);
  max = Math.abs(max);

  if (min > max) {
    let swap = min;
    min = max;
    max = swap;
  }
  // console.log(min);
  // console.log(max);

  let value = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log(value);

  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

round(-3.54657, 1.26567653, 2)
// let result2 = round(-3.54657, 1.26567653, 2);
// console.log(result2);
