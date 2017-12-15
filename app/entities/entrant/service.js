const _pick = require('lodash/pick');
const { fields } = require('./model');
const EntrantRepository = require('./repository');

function create(entity) {
    const newEntity = _pick(entity, fields);
    return EntrantRepository.create(newEntity);
}

function getList() {
    return EntrantRepository.getList();
}

function get(id) {
    return EntrantRepository.get(id);
}
function remove(id) {
    return EntrantRepository.remove(id);
}

function update(id, entrant) {
    const validEntrant = _pick(entrant, fields);
    return EntrantRepository.update(id, validEntrant);
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
