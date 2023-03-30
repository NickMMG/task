const express = require('express');
const morgan = require('morgan');

function expressConfig(app) {
  app.use(morgan('dev'));

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
}

module.exports = expressConfig;
