import API from './fetchCountries';
import countryCard from '../src/templates/countryCardTmplt.hbs'
import countryCards from '../src/templates/countryCardsTmplt.hbs'
 import Notiflix from 'notiflix';
import debounce  from 'lodash.debounce';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const refs = {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


refs.searchBox.addEventListener('input', debounce(onChangeInput, DEBOUNCE_DELAY));
const input = refs.searchBox.value;
  

function onChangeInput(e) {
    e.preventDefault();

  const input = e.target.value.trim();

  if (!input) return (refs.countryList.innerHTML = ''),
    (refs.countryInfo.innerHTML = '');
   API.fetchCountries(input)
        .then(renderCardsTmlp)
      .catch(onFetchError);
  }
    


function renderCardsTmlp(country) {
  const markupList = countryCards(country);
  const markup = countryCard(country);
    refs.countryList.innerHTML = markupList;
   
   if (country.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (country.length === 1) {
     refs.countryInfo.innerHTML = markup;
     refs.countryList.innerHTML = '';
   }
   else if (country.length > 2 && country.length < 10)  {
     refs.countryInfo.innerHTML = '';
  }
  
};


function onFetchError(error) {
   Notiflix.Notify.failure("Oops, there is no country with that name");
};

