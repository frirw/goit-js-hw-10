import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.style.display = 'none';
error.style.display = 'none';
catInfo.style.display = 'none';

function catBreeds(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');

    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  breedSelect.addEventListener('change', handleSelect);
}

function handleSelect() {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      loader.style.display = 'none';
      catInfo.style.display = 'block';
      catInfo.style.display = 'flex';
    })
    .catch(() => {
      error.style.display = 'block';
      loader.style.display = 'none';
    });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" height=200>
    
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>
  `;

  const catTitle = catInfo.querySelector('h2');
  const catDescription = catInfo.querySelectorAll('p');
  catTitle.style.margin = '10px';
  catDescription.forEach(descr => {
    descr.style.margin = '10px';
  });
}

loader.style.display = 'block';

fetchBreeds()
  .then(breeds => {
    catBreeds(breeds);
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  })
  .catch(() => {
    error.style.display = 'block';
    loader.style.display = 'none';
  });
