const Entrant = require('./model').model;

function create(entity) {
    return Entrant.create(entity);
}

function getList() {
    return Entrant.find({});
}

function get(id) {
    return Entrant.findById(id);
}

function remove(id) {
    return Entrant.remove({ _id: id });
}

function update(id, entrant) {
    return Entrant.findByIdAndUpdate(id, { $set: entrant }, { new: true });
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
