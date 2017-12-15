const User = require('./model').model;

function create(entity) {
    return User.create(entity);
}

function findByUsername(username) {
    return User.findOne({ username: username });
}

module.exports = {
    create,
    findByUsername,
};
