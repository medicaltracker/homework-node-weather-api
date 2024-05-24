const createError = require('http-errors');

const notFoundHandler = (req, res, next) => {
  next(createError(404));
};

const errorHandler = (err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send(err.message);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
