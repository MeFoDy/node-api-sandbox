const { model: Entrant, fields } = require('./model');
const copyObjectFields = require('../../utils/objectHelper').copyObjectFields;

function create(entity) {
    const newEntity = copyObjectFields(entity, fields);
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
            const validEntrant = copyObjectFields(entrant, fields);
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
