const axios = require('axios');

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = '8aba2c4cb10f0f8a0f1a52ab189f999e';

async function fetchWeatherFromApi(cityId) {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        id: cityId,
        appid: WEATHER_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data from API:', error);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = fetchWeatherFromApi;