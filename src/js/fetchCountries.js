export default fetchCountries;
function fetchCountries(name) { 
    const BASE_URL = `https://restcountries.com/v3.1/name/`;
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(r => {
    if (r.ok) {
      return r.json();
    }
    throw new Error('Error fetching data');
    })
        
};
