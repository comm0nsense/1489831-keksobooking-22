//["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
const ad1 = ['wifi', 'parking', 'dishwasher'];
const ad2 = ["parking", "washer", "elevator"];
const ad3 = ['wifi', 'parking'];


const featuresSelected1 = ['wifi', 'parking'];
const featuresSelected2 = ['elevator', 'wifi'];


const isHavingFeatures = () => {
  for (let i = 0; i <= featuresSelected1.length-1; i++) {
    console.log(featuresSelected1[i]);
    if (ad1.includes(featuresSelected1[i])) {
      console.log('содержит выбранную фичу')
    } else {
      console.log('не содержит выбранную фичу')
      return false
    }
  }
  return true
}

console.log(isHavingFeatures());

const isHavingFeatures3 = () => {
  for (let i = 0; i <= featuresSelected1.length-1; i++) {
    console.log(featuresSelected1[i]);
    if (!ad1.includes(featuresSelected1[i])) {
      return false
    }
  }
  return true
}

console.log(isHavingFeatures3());

const isHavingFeatures2 = () => {
  for (let i = 0; i <= featuresSelected1.length-1; i++) {
    console.log(featuresSelected2[i]);
    if (ad1.includes(featuresSelected2[i])) {
      console.log('содержит выбранную фичу')
    } else {
      console.log('не содержит выбранную фичу')
      return false
    }
  }
  return false
}

console.log(isHavingFeatures2());
