const _pick = require('lodash/pick');
const { model: Entrant, fields } = require('./model');

function create(entity) {
    const newEntity = _pick(entity, fields);
    return Entrant.create(newEntity);
}

function getList() {
    return Entrant.find({}).exec();
}

function get(id) {
    return Entrant.findById(id);
}

function remove(id) {
    return Entrant.remove({ _id: id });
}

function update(id, entrant) {
    const validEntrant = _pick(entrant, fields);
    return Entrant.findByIdAndUpdate(id, { $set: validEntrant }, { new: true });
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
