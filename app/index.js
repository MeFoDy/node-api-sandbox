const express = require('express');
const app = express();
const db = require('./db');
const logger = require('./utils/logger');

const EntrantsController = require('./entities/entrant/controller');
app.use('/entrants', EntrantsController);

module.exports = app;
