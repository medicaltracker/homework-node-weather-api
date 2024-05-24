function validateCityId(req, res, next) {
  const cityId = req.params.id || req.query.id;
  if (!cityId) {
    return res.status(400).send('City ID is required');
  }
  req.cityId = cityId;
  next();
}

module.exports = validateCityId;