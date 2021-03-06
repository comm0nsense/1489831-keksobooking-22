const URL = 'https://jsonplaceholder.typicode.com/todos';

const getPosts = async () => {
  let response;
  try {
    response = await fetch(URL);
  } catch (error) {
    console.log(error);
    return [];
  }

  const posts = await response.json();
  return posts;
};

(async() => {
  const posts = await getPosts();
  console.log(posts);
})();

// const posts = await getPosts();
// console.log(`Список публикаций: `);
// console.log(posts);
