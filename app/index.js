const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./db');
require('./utils/logger');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

const EntrantsController = require('./entities/entrant');
app.use('/entrants', EntrantsController);

const FacultiesController = require('./entities/faculty');
app.use('/faculty', FacultiesController);

const ApplicationsController = require('./entities/application');
app.use('/application', ApplicationsController);

module.exports = app;
