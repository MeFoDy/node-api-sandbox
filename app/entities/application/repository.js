const Application = require('./model').model;

function create(application) {
    return Application.create(application);
}

function getList() {
    return Application.find({});
}

function get(id) {
    return Application.findById(id);
}

function find({ entrantId, facultyId }) {
    return Application.findOne({
        entrant: entrantId,
        faculty: facultyId,
    });
}

function remove(id) {
    return Application.remove({ _id: id });
}

function update(id, application) {
    return Application.findByIdAndUpdate(id, { $set: application }, { new: true });
}

module.exports = {
    create,
    find,
    get,
    getList,
    remove,
    update,
};
