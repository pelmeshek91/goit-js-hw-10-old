const BASE_URL = 'https://restcountries.com/v3.1/';
const character = 'character';
const limit = 10;
const options = {
  headers: {
    Authorization: bearer,
  },
};

export default function lordApi(page = 1) {
  const response = fetch(
    `${BASE_URL}${character}/?limit=${limit}&page=${page}`,
    options
  )
    .then(data => {
      if (!data.ok) {
        throw new Error('Fail');
      }
      return data.json();
    })
    .catch(err => console.error(err));
  return response;
}
