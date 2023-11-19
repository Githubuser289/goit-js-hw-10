import { fetchBreeds, fetchCatByBreed, onFetchError } from './cat-api.js';
import SlimSelect from 'slim-select';

let slimselect = new SlimSelect({
  select: document.querySelector('.breed-select'),
  events: {
    afterChange: newVal => {
      console.log('***');
      console.log(newVal);
      // loadContentIntoHtml(newVal);
    },
  },
});

const selectElem = document.querySelector('.breed-select'),
  pLoader = document.querySelector('.loader'),
  pError = document.querySelector('.error'),
  catInfoElem = document.querySelector('.cat-info');

function hideElement(element) {
  element.style.display = 'none';
}
function showElement(element) {
  element.style.display = 'block';
}

function displayBreed(event) {
  event.preventDefault();
  fetchCatByBreed(storedBreeds[selectElem.value].id)
    .then(data => {
      hideElement(pError);
      hideElement(catInfoElem);
      showElement(pLoader);
      const { url, breeds } = data[0];
      catInfoElem.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
    })
    .catch(onFetchError)
    .finally(() => {
      hideElement(pLoader);
      showElement(catInfoElem);
    });
}

hideElement(pError);
let storedBreeds = [];

fetchBreeds()
  .then(data => {
    hideElement(pError);
    hideElement(selectElem);
    showElement(pLoader);
    data = data.filter(img => img.image?.url != null);
    storedBreeds = data;
    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');
      if (!breed.image) continue;
      option.value = i;
      option.innerHTML = `${breed.name}`;
      document.querySelector('.breed-select').appendChild(option);
    }
  })
  .catch(onFetchError)
  .finally(() => {
    hideElement(pLoader);
    showElement(selectElem);
  });

// selectElem.addEventListener('change', displayBreed);
