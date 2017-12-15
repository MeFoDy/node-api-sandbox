const express = require('express');
const router = express.Router();
const errorHandler = require('../../utils/errorHandler');
const statusCodes = require('../../../config/statusCodes');
const dbConfig = require('../../../config/db');

const passport = require('passport');
require('../../passport')(passport);
const jwt = require('jsonwebtoken');

const UserService = require('./service');

router.post('/signup', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };
    UserService
        .create(user)
        .then(() => {
            setSuccessMessage(res, 'Successful created new user.');
        })
        .catch(err => {
            errorHandler(err, res, 'Username already exists.');
        });
});

router.post('/signin', (req, res) => {
    UserService
        .get(req.body.username)
        .then(user => {
            if (!user) {
                return setUnauthorizedMessage(res, 'User not found.');
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    const token = jwt.sign(user.toJSON(), dbConfig.secret, { expiresIn: 60 * 17 });
                    res.json({
                        success: true,
                        token: `Bearer ${token}`,
                    });
                } else {
                    setUnauthorizedMessage(res, 'Wrong password.');
                }
            });
        })
        .catch(err => {
            errorHandler(err, res, 'Authentication failed.');
        });
});

module.exports = router;

function setUnauthorizedMessage(res, message) {
    res.status(statusCodes.unauthorized).send({
        success: false,
        msg: `Authentication failed. ${message}`,
    });
}

function setSuccessMessage(res, message) {
    res.json({
        success: true,
        message: message,
    });
}
