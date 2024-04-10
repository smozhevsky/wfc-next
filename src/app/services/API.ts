import axios from 'axios';

const weatherService = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
});

const cityNameService = axios.create({
  baseURL: `https://countriesnow.space/api/v0.1/`,
  // baseURL: `https://restcountries.eu/rest/v2`,
});
export { weatherService, cityNameService };
