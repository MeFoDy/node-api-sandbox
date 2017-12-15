const _pick = require('lodash/pick');
const { fields } = require('./model');
const UserRepository = require('./repository');

function create(entity) {
    if (!entity.username || !entity.password) {
        throw new Error('Please pass username and password.');
    }
    const newUser = _pick(entity, fields);
    return UserRepository.create(newUser);
}

function get(username) {
    return UserRepository.findByUsername(username);
}

module.exports = {
    create,
    get,
};
