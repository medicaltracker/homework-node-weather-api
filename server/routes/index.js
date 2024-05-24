const express = require('express');
const router = express.Router();
const fetchWeatherFromApi = require('../utils/fetchWeatherFromApi.js');
const validateCityId = require('../middleware/validateCityId.js')
const loadData = require('../middleware/loadData.js')
const saveData = require('../middleware/saveData.js')

// Route to add a new city
router.post('/cities', validateCityId, loadData, async (req, res, next) => {
  const cityId = req.cityId;

  if (req.data.cities[cityId]) {
    return res.status(409).send('City already exists');
  }

  try {
    const cityWeatherData = await fetchWeatherFromApi(cityId);
    req.data.cities[cityId] = cityWeatherData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}, saveData, (req, res) => {
  res.status(201).send('City added successfully');
});

// Route to update city weather data
router.put('/cities/:id', validateCityId, loadData, async (req, res, next) => {
  const cityId = req.cityId;

  try {
    const cityWeatherData = await fetchWeatherFromApi(cityId);
    req.data.cities[cityId] = cityWeatherData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}, saveData, (req, res) => {
  res.status(200).send('City weather updated successfully');
});

// Route to get all cities
router.get('/cities',loadData,  async (req, res) => {
  try {
    res.send(req.data.cities);
  } catch (error) {
    res.status(500).send('Failed to read data from file');
  }
});

// Route to get a specific city
router.get('/cities/:id', validateCityId, loadData, (req, res) => {
  const cityId = req.cityId;

  if (req.data.cities[cityId]) {
    res.send(req.data.cities[cityId]);
  } else {
    res.status(404).send('City does not exist');
  }
});

// Route to delete a city
router.delete('/cities/:id', validateCityId, loadData, async (req, res, next) => {
  const cityId = req.cityId;

  if (req.data.cities[cityId]) {
    delete req.data.cities[cityId];
    next();
  } else {
    res.status(404).send('City does not exist');
  }
}, saveData, (req, res) => {
  res.send('City removed');
});

// Route to get the latest weather data for a city
router.get('/cities/:id/weather', validateCityId, loadData, async (req, res, next) => {
  const cityId = req.cityId;

  if (!req.data.cities[cityId]) {
    return res.status(404).send('City does not exist');
  }

  try {
    const latestWeatherData = await fetchWeatherFromApi(cityId);
    req.data.cities[cityId] = latestWeatherData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}, saveData, (req, res) => {
  res.send(req.data.cities[req.cityId]);
});

module.exports = router;
