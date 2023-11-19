import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const URL = `https://api.thecatapi.com/v1/`;
axios.defaults.headers.common['x-api-key'] =
  'live_UnZxlrbBcsDyHebTcqmOWDIE4Wa2C0RbB5bcAFVQ8JgsUs7RKWCRy29fQqv9QEyJ';

function onFetchError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function fetchBreeds() {
  document.querySelector('.loader').style.display = 'block';
  return axios(URL + 'breeds').then(response => {
    if (response.status != 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  document.querySelector('.loader').style.display = 'block';
  return axios(URL + 'images/search?breed_ids=' + breedId).then(response => {
    if (response.status != 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed, onFetchError };
