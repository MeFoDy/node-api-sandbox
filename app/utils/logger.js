const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const config = require('../../config/logger');
const fs = require('fs');
const path = require('path');

/* eslint-disable no-sync */
if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const commonOptions = {
    timestamp: tsFormat,
    handleExceptions: true,
    humanReadableUnhandledException: true,
};
const consoleLoggerOptions = Object.assign({
    colorize: true,
    level: 'info',
    silent: process.env.NODE_ENV === 'test',
}, commonOptions);
const fileLoggerOptions = Object.assign({
    filename: path.resolve(__dirname, `../../${config.logDir}/${config.serverFileName}`),
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
}, commonOptions);

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(consoleLoggerOptions),
        new (winstonDailyRotateFile)(fileLoggerOptions),
    ],
});

function formatMessage(message, err) {
    return message + (err ? ` — ${err}` : '');
}

function error(message, err) {
    logger.log('error', formatMessage(message, err));
}

function info(message, err) {
    logger.log('info', formatMessage(message, err));
}

module.exports = {
    entity: logger,
    error,
    info,
};
