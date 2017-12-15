const _pick = require('lodash/pick');
const { fields } = require('./model');
const FacultyRepository = require('./repository');

function create(entity) {
    const newFaculty = _pick(entity, fields);
    return FacultyRepository.create(newFaculty);
}

function getList() {
    return FacultyRepository.getList();
}

function get(id) {
    return FacultyRepository.get(id);
}

function remove(id) {
    return FacultyRepository.remove(id);
}

function update(id, faculty) {
    const validFaculty = _pick(faculty, fields);
    return FacultyRepository.update(id, validFaculty);
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
