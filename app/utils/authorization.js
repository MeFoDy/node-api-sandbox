const statusCodes = require('../../config/statusCodes');

function getToken(headers) {
    if (headers && headers.authorization) {
        const parts = headers.authorization.split(' ');
        if (parts.length === 2) {
            return parts[1];
        }
        return null;
    }
    return null;
}

function setResponseForbidden(res) {
    return res.status(statusCodes.forbidden).send({
        success: false,
        message: 'Unauthorized.',
    });
}

function isAuthorized(headers, res) {
    const token = getToken(headers);
    if (!token) {
        setResponseForbidden(res);
        return false;
    }
    return true;
}

module.exports = {
    getToken,
    isAuthorized,
    setResponseForbidden,
};
