const _pick = require('lodash/pick');
const { model: Faculty, fields } = require('./model');

function create(entity) {
    const newFaculty = _pick(entity, fields);
    return Faculty.create(newFaculty);
}

function getList() {
    return Faculty.find({}).exec();
}

function get(id) {
    return Faculty.findById(id);
}

function remove(id) {
    return Faculty.remove({ _id: id });
}

function update(id, entrant) {
    const validFaculty = _pick(entrant, fields);
    return Faculty.findByIdAndUpdate(id, { $set: validFaculty }, { new: true });
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
