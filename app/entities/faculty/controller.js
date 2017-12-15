const express = require('express');
const passport = require('passport');
const router = express.Router();
const { errorHandler, authorization } = require('../../utils');
const statusCodes = require('../../../config/statusCodes');

const FacultyService = require('./service');

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!authorization.isAuthorized(req.headers, res)) return;
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

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!authorization.isAuthorized(req.headers, res)) return;
    FacultyService
        .remove(req.params.id)
        .then(() => {
            res.status(statusCodes.ok).send();
        })
        .catch(err => {
            errorHandler(err, res, 'Cannot remove faculties from database');
        });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!authorization.isAuthorized(req.headers, res)) return;
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
