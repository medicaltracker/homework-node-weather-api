const fs = require('fs');
const datastore = './dataStore.json';

// Utility function to read data from file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(datastore, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return { cities: {} };
  }
}

// Utility function to write data to file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(datastore, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}

module.exports = { readDataFromFile,  writeDataToFile }