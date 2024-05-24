// Middleware to save data
const { writeDataToFile } = require('../utils/files.js');

async function saveData(req, res, next) {
  try {
    await writeDataToFile(req.data);
    next();
  } catch (error) {
    res.status(500).send('Failed to write data to file');
  }
}

module.exports = saveData;