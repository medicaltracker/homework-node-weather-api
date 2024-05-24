// Import the necessary modules
import request from 'supertest';
import express from 'express';
import axios from 'axios';
import { readDataFromFile, writeDataToFile } from '../../utils/files.js';

// Import the router and any other necessary functions
import router from '../index.js';

// Create an instance of Express app
const app = express();
app.use(express.json());
app.use('/', router);

// Mock the axios get method using Jest's spyOn
jest.mock('axios');

jest.mock('../../utils/files.js', () => ({
  readDataFromFile: jest.fn(),
  writeDataToFile: jest.fn(),
}));

// Mock the request and response objects
const req = {
  cityId: '1',
};
const res = {
  status: jest.fn(() => res),
  send: jest.fn(),
};

const fetchWeatherFromApi = jest.fn();

describe('POST /cities', () => {
  // Set mock data before each test
  let mockData;
  beforeEach(() => {
    mockData = { cities: {} };
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if city ID is not provided', async () => {
    const res = await request(app).post('/cities');
    expect(res.status).toBe(400);
    expect(res.text).toBe('City ID is required');
  });

  it('should return 409 if the city already exists', async () => {
    // Setup mock data to simulate existing city
    mockData.cities['12345'] = { weather: 'existing data' };

    // Re-stub readDataFromFile to return the updated mock data
    readDataFromFile.mockReturnValue(mockData);

    const res = await request(app).post('/cities').query({ id: '12345' });

    expect(res.status).toBe(409);
    expect(res.text).toBe('City already exists');
  });

  it('should add a new city successfully', async () => {
    // Mock the response of the axios get method;
    readDataFromFile.mockReturnValue(mockData);

    axios.get.mockResolvedValue({
      data: { weather: 'data' }
    });

    // Send a POST request to the endpoint
    const res = await request(app).post('/cities').query({ id: '12345' });

    // Expectations
    expect(res.status).toBe(201);
    expect(res.text).toBe('City added successfully');
  });
});

describe('PUT /cities/:id', () => {
  it('should update city weather successfully', async () => {
    // Mock the data read from the file
    const mockData = { cities: {} };
    readDataFromFile.mockReturnValue(mockData);

    // Mock the city weather data
    const cityWeatherData = { weather: {} };
    fetchWeatherFromApi.mockResolvedValue(cityWeatherData);

    // Call the route handler
    // Send a PUT request to the endpoint
    const res = await request(app)
      .put('/cities/123') // Use the correct route URL
      .send(); // Send an empty request body

    // Assertions
    expect(res.status).toBe(200);
    expect(res.text).toBe('City weather updated successfully');
  });
});


describe('GET /cities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of cities', async () => {
    // Mock the data read from the file
    const mockData = {
      cities: {
        '1': { weather: 'Weather1' },
        '2': { weather: 'Weather2' },
      },
    };
    readDataFromFile.mockReturnValue(mockData);

    // Send a GET request to the endpoint
    const res = await request(app).get('/cities');

    // Assertions
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData.cities);
  });
});

describe('GET /cities/:id', () => {
  it('should return the city if it exists', async () => {
    // Mock the data read from the file
    const mockData = {
      cities: {
        '1': { name: 'City1', weather: 'Weather1' },
        '2': { name: 'City2', weather: 'Weather2' },
      },
    };
    readDataFromFile.mockReturnValue(mockData);

    // Send a GET request to the endpoint with an existing city ID
    const res = await request(app).get('/cities/1');

    // Assertions
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData.cities['1']);
  });

  it('should return 404 if the city does not exist', async () => {
    // Mock the data read from the file
    const mockData = {
      cities: {
        '1': { name: 'City1', weather: 'Weather1' },
        '2': { name: 'City2', weather: 'Weather2' },
      },
    };
    readDataFromFile.mockReturnValue(mockData);

    // Send a GET request to the endpoint with a non-existing city ID
    const res = await request(app).get('/cities/3');

    // Assertions
    expect(res.status).toBe(404);
    expect(res.text).toBe('City does not exist');
  });
});


describe('GET /cities/:id/weather', () => {
  it('should return the latest weather data for a valid city ID', async () => {
    const mockWeatherData = { temperature: 25, description: 'Sunny' };
    readDataFromFile.mockReturnValue({ cities: { '1': {} } });
    fetchWeatherFromApi.mockResolvedValue(mockWeatherData);

    const res = await request(app).get('/cities/1/weather');

    expect(res.status).toBe(200);
  });

  it('should return 404 if the city does not exist', async () => {
    // Mock the data read from the file
    const mockData = { cities: {} };
    readDataFromFile.mockReturnValue(mockData);

    // Send a GET request to the endpoint with a non-existing city ID
    const res = await request(app).get('/cities/3/weather');

    // Assertions
    expect(res.status).toBe(404);
    expect(res.text).toBe('City does not exist');
  });
});