const express = require('express');
const router = express.Router();
const errorHandler = require('../../utils/errorHandler');
const statusCodes = require('../../../config/statusCodes');

const FacultyService = require('./service');

router.post('/', (req, res) => {
    FacultyService
        .create(req.body)
        .then(faculty => {
            res.status(statusCodes.ok).send(faculty);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot add new faculty to the database');
        });
});

router.get('/', (req, res) => {
    FacultyService
        .getList()
        .then(faculties => {
            res.status(statusCodes.ok).send(faculties);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot get faculties list from database');
        });
});

router.get('/:id', (req, res) => {
    FacultyService
        .get(req.params.id)
        .then(faculty => {
            res.status(statusCodes.ok).send(faculty);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot get faculty from database');
        });
});

router.delete('/:id', (req, res) => {
    FacultyService
        .remove(req.params.id)
        .then(() => {
            res.status(statusCodes.ok).send();
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot remove faculties from database');
        });
});

router.put('/:id', (req, res) => {
    FacultyService
        .update(req.params.id, req.body)
        .then(faculty => {
            res.status(statusCodes.ok).send(faculty);
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot update faculty');
        });
});

module.exports = router;
