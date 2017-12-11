const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../utils/logger');
const statusCodes = require('../../../config/statusCodes');

const Entrant = require('./model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    Entrant.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        patronymic: req.body.patronymic,
        sex: req.body.sex,
        dateOfBirth: req.body.dateOfBirth,
    }, (err, entrant) => {
        if (err) {
            logger.log('error', `Cannot add new entrant to the database: ${JSON.stringify(entrant)}`);
            return res
                .status(statusCodes.serverInternalError)
                .send('Cannot add new entrant to the database');
        }
        res.status(statusCodes.ok).send(entrant);
    });
});

router.get('/', (req, res) => {
    Entrant.find({}, (err, entrants) => {
        if (err) {
            logger.log('error', `Cannot get entrants list from database`);
            return res
                .status(statusCodes.serverInternalError)
                .send('Cannot get entrants list from database');
        }
        res.status(statusCodes.ok).send(entrants);
    });
});

module.exports = router;
