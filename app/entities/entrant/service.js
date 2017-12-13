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
    return Entrant
        .findById(id)
        .then(dbEntrant => {
            const validEntrant = _pick(entrant, fields);
            dbEntrant.set(validEntrant);
            return dbEntrant.save();
        });
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
