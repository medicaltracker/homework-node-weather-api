const express = require('express');
const logger = require('morgan');

const citiesRouter = require('./routes/index');
const { notFoundHandler, errorHandler } = require('./errorHandler');

const app = express();
// Middleware setup
app.use(logger('dev'));
app.use(express.json());

// Routes
app.use('/api', citiesRouter);

// Catch 404 and forward to error handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

module.exports = app;
