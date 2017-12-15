const Faculty = require('./model').model;

function create(entity) {
    return Faculty.create(entity);
}

function getList() {
    return Faculty.find({});
}

function get(id) {
    return Faculty.findById(id);
}

function remove(id) {
    return Faculty.remove({ _id: id });
}

function update(id, faculty) {
    return Faculty.findByIdAndUpdate(id, { $set: faculty }, { new: true });
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
