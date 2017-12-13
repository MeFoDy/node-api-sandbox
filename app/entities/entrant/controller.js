const express = require('express');
const router = express.Router();
const errorHandler = require('../../utils/errorHandler');
const statusCodes = require('../../../config/statusCodes');

const EntrantService = require('./service');

router.post('/', (req, res) => {
    EntrantService
        .create(req.body)
        .then(entrant => {
            res.status(statusCodes.ok).send(entrant);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot add new entrant to the database');
        });
});

router.get('/', (req, res) => {
    EntrantService
        .getList()
        .then(entrants => {
            res.status(statusCodes.ok).send(entrants);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot get entrants list from database');
        });
});

router.get('/:id', (req, res) => {
    EntrantService
        .get(req.params.id)
        .then(entrant => {
            res.status(statusCodes.ok).send(entrant);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot get entrant from database');
        });
});

router.delete('/:id', (req, res) => {
    EntrantService
        .remove(req.params.id)
        .then(() => {
            res.status(statusCodes.ok).send();
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot remove entrant from database');
        });
});

router.put('/:id', (req, res) => {
    EntrantService
        .update(req.params.id, req.body)
        .then(entrant => {
            res.status(statusCodes.ok).send(entrant);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot update entrant');
        });
});

module.exports = router;
