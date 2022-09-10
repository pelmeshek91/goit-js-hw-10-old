import './css/styles.css';
import * as debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import myFunc from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(country) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const filtersCountries = '?fields=flag,capital,name,population,languages';
  return fetch(`${BASE_URL}${country}${filtersCountries}`)
    .then(data => {
      if (!data.ok) {
        throw new Error(
          Notify.failure('Oops, there is no country with that name')
        );
      }
      return data.json();
    })
    .catch(err => console.error(err));
}

input.addEventListener('input', debounce(requestCountry, DEBOUNCE_DELAY));

function requestCountry(e) {
  const inputValue = e.target.value.trim();
  console.log(inputValue);
  if (inputValue) {
    fetchCountries(inputValue).then(setMarkup);
  } else {
    countryList.innerHTML = '';
  }
}

function createMarkup(arr) {
  console.log(arr);
  return arr.reduce(
    (acc, { name, flag }) =>
      acc +
      `<li><img src="${flag}" style="width:30px;height:30px;"><p>${name}</p></li>`,
    ''
  );
}

function createCountry({ flag, name, capital, population, languages }) {
  return `<img src="${flag}" style="width:30px;height:30px;"><p>${name}</p><p>${capital}</p><p>${population}</p><p> ${languages}</p>`;
}
function setMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');

    return;
  }
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (countries.length === 1) {
    countryInfo.innerHTML = createCountry(countries[0]);
    return;
  }

  countryList.insertAdjacentHTML('beforeend', createMarkup(countries));
}
/* import './css/styles.css';
import * as debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import myFunc from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(country) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const filtersCountries = '?fields=flag,capital,name,population,languages';
  return fetch(`${BASE_URL}${country}${filtersCountries}`)
    .then(data => {
      if (!data.ok) {
        throw new Error(
          Notify.failure('Oops, there is no country with that name')
        );
      }
      return data.json();
    })
    .catch(err => console.error(err));
}

input.addEventListener('input', debounce(requestCountry, DEBOUNCE_DELAY));

function requestCountry(e) {
  const inputValue = e.target.value.trim();
  if (inputValue) {
    fetchCountries(inputValue).then(setMarkup);
  } else {
    countryList.innerHTML = '';
  }
}

function createMarkup(arr) {
  console.log(arr);
  return arr.reduce(
    (acc, { name, flag }) =>
      acc +
      `<li class="country-item"><img src="${flag}" style="width:30px;height:30px;"><p class="country-name">${name}</p></li>`,
    ''
  );
}

function createCountry({ flag, name, capital, population, languages }) {
  return `<img src="${flag}" style="width:30px;height:30px;"><p>${name}</p><p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${languages.map(
    element => element.name
  )}</p>`;
}
function setMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');

    return;
  }
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (countries.length === 1) {
    countryInfo.innerHTML = createCountry(countries[0]);
    return;
  }

  countryList.insertAdjacentHTML('beforeend', createMarkup(countries));
}
 */
