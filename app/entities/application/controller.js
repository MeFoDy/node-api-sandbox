const express = require('express');
const router = express.Router();
const errorHandler = require('../../utils/errorHandler');
const statusCodes = require('../../../config/statusCodes');

const ApplicationService = require('./service');

router.post('/', (req, res) => {
    ApplicationService
        .create(req.body)
        .then(application => {
            res.status(statusCodes.ok).send(application);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot add new application to the database');
        });
});

router.get('/', (req, res) => {
    ApplicationService
        .getList()
        .then(applications => {
            res.status(statusCodes.ok).send(applications);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot get applications list from database');
        });
});

router.get('/:id', (req, res) => {
    ApplicationService
        .get(req.params.id)
        .then(application => {
            res.status(statusCodes.ok).send(application);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot get application from database');
        });
});

router.delete('/:id', (req, res) => {
    ApplicationService
        .remove(req.params.id)
        .then(() => {
            res.status(statusCodes.ok).send();
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot remove application from database');
        });
});

router.put('/:id', (req, res) => {
    ApplicationService
        .update(req.params.id, req.body)
        .then(application => {
            res.status(statusCodes.ok).send(application);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot update application');
        });
});

module.exports = router;
