const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./db');
require('./utils/logger');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

const EntrantsController = require('./entities/entrant');
app.use('/entrants', EntrantsController);

module.exports = app;
