const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const createError = require('http-errors');
const routes = require('./routes/');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ 
    code: error.status || 500,
    msg: error.message
  });
});

module.exports = app;