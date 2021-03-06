// Полчучаем данные об объявлениях с сервера
const getData = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Не удается зарузить данные. Перезагрузите страницу.');
  }
};


//Отпралвение данные из формы на сервер
const postData = async (url, body) => {
  const response = await fetch(
    url,
    {
      method: 'POST',
      body,
    })

  if (!response.ok) {
    throw new Error('Rejected: Не удалось отправить данные');
  }
};

export { getData, postData }
