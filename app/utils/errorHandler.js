
const logger = require('../utils/logger');
const statusCodes = require('../../config/statusCodes');

function handleError(error, response, message) {
    if (error) {
        logger.error(message, error);
        response
            .status(statusCodes.serverInternalError)
            .json({
                message,
                error,
            });
    }
}

module.exports = handleError;
