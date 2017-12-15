const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

require('./db');
require('./utils/logger');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

const EntrantsController = require('./entities/entrant');
app.use('/entrants', EntrantsController);

const FacultiesController = require('./entities/faculty');
app.use('/faculty', FacultiesController);

const ApplicationsController = require('./entities/application');
app.use('/application', ApplicationsController);

const UserController = require('./entities/user');
app.use('/user', UserController);

module.exports = app;
