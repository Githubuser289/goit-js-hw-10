import { fetchBreeds, fetchCatByBreed, onFetchError } from './cat-api.js';
import SlimSelect from 'slim-select';

let counter = 0;
let slimselect = new SlimSelect({
  select: document.querySelector('.breed-select'),
  events: {
    afterChange: newVal => {
      if (counter === 0) {
        counter++;
        return;
      }
      displayBreed(newVal[0].value);
    },
  },
});
hideElement(document.querySelector('.ss-values'));

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

function displayBreed(breed) {
  fetchCatByBreed(breed)
    .then(data => {
      hideElement(pError);
      hideElement(catInfoElem);
      showElement(pLoader);
      hideElement(document.querySelector('body>div'));
      hideElement(document.querySelector('.ss-content'));
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
    const dataSlimSelect = [];
    data.map(cat => {
      dataSlimSelect.push({ text: cat.name, value: cat.id });
    });
    slimselect.setData(dataSlimSelect);
  })
  .catch(onFetchError)
  .finally(() => {
    hideElement(pLoader);
    showElement(selectElem);
  });
