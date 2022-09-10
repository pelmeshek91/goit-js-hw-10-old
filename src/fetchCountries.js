const BASE_URL = 'https://restcountries.com/v3.1/all';
/* const character = 'character';
const limit = 10;
const options = {
  headers: {
    Authorization: bearer,
  },
}; */

export default function fetchCountries() {
  const response = fetch(`${BASE_URL}`)
    .then(data => {
      if (!data.ok) {
        throw new Error('Fail');
      }

      return data.json();
    })
    .catch(err => console.error(err));
  return response;
}
