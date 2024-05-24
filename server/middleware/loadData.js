// Middleware to load data
const { readDataFromFile} = require('../utils/files.js');

async function loadData(req, res, next) {
  try {
    req.data = await readDataFromFile();
    next();
  } catch (error) {
    res.status(500).send('Failed to read data from file');
  }
}

module.exports = loadData;