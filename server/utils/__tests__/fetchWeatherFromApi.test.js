import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fetchWeatherFromApi from '../fetchWeatherFromApi.js';
// Initialize mock adapter
const mock = new MockAdapter(axios);

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = '8aba2c4cb10f0f8a0f1a52ab189f999e';

describe('fetchWeatherFromApi', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch weather data for a given city ID', async () => {
    const cityId = 264374;
    const mockResponse = { weather: 'sunny' };

    // Mock the API response
    mock.onGet(WEATHER_API_URL, { params: { id: cityId, appid: WEATHER_API_KEY } }).reply(200, mockResponse);

    const result = await fetchWeatherFromApi(cityId);

    expect(result).toEqual(mockResponse);
  });
});