import { fetchBreeds, fetchCatByBreed, onFetchError } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectElem = document.querySelector('.breed-select'),
  pLoader = document.querySelector('.loader'),
  pError = document.querySelector('.error'),
  catInfoElem = document.querySelector('.cat-info');

pLoader.innerHTML = '';
pError.innerHTML = '';
hideElement(pError);

let slimselect = new SlimSelect({
  select: document.querySelector('.breed-select'),
  events: {
    afterChange: newVal => {
      catInfoElem.innerHTML = '';
      if (newVal.length === 0 || newVal[0].text === "Here search Cat's") {
        return;
      }
      displayBreed(newVal[0].value);
    },
  },
});

function hideElement(element) {
  element.style.display = 'none';
}
function showElement(element) {
  element.style.display = 'block';
}

function displayBreed(breed) {
  fetchCatByBreed(breed)
    .then(data => {
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

hideElement(selectElem);
fetchBreeds()
  .then(data => {
    showElement(pLoader);
    const dataSlimSelect = [{ placeholder: true, text: "Here search Cat's" }];
    data.map(cat => {
      dataSlimSelect.push({ text: cat.name, value: cat.id });
    });
    slimselect.setData(dataSlimSelect);
  })
  .catch(onFetchError)
  .finally(() => {
    hideElement(pLoader);
  });
