import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
    searchCountry: document.querySelector('#search-box'),
    resultSearch: document.querySelector('.country-list'),
    infoAboutCountry: document.querySelector('.country-info'),
};

refs.searchCountry.addEventListener('input', debounce(sadsa, DEBOUNCE_DELAY));

function sadsa() {
    let search = refs.searchCountry.value.trim();
    if (search === '') {
        return clearAll();
    }
    fetchCountries(search)
        .then(country => markupArticles(country))
        .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
            clearAll();
      });
    console.log(search);
    
}

function markupArticles(country) {
    let markup = '';
    if (country.length > 10) { 
         return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (country.length <= 10) {
        markup = country
    .map(({ name,flags }) => {return `
  <li class="country-item">
    <img src="${flags.svg}" alt="Flag country" width="30">
    <p>Country: ${name.official}</p>
  </li>`}
    )
    .join('');
        refs.resultSearch.innerHTML = markup;
        clearInfoCountry();
    }
    
    if (country.length === 1) {
        markup = country
            .map(({ name, capital, population, flags, languages }) => {
                return `<li>
        <p class="name"><img src="${flags.svg}" alt="flag" width ="40"> ${name.official}</p>
           <p><span>Capital:</span> ${capital}</p>
            <p><span>Population:</span> ${population}</p>
            <p><span>Languages:</span> ${Object.values(languages)}</p>
          </li>`}
            )
            .join('');
        refs.infoAboutCountry.innerHTML = markup;
        clearCountryList()
    }
    
}

function clearCountryList() {
    refs.resultSearch.innerHTML = '';
}

function clearInfoCountry() {
    refs.infoAboutCountry.innerHTML = '';
}

function clearAll() {
    refs.infoAboutCountry.innerHTML = '';
    refs.resultSearch.innerHTML = '';
}