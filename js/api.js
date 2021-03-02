const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const getData = async () => {
  const response = await fetch(GET_DATA_URL);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Не удается зарузить данные. Перезагрузите страницу.');
  }

};

export { getData }
