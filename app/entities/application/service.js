const _pick = require('lodash/pick');
const { model: Application, fields } = require('./model');
const EntrantService = require('../entrant/service');
const FacultyService = require('../faculty/service');

async function create({ facultyId, entrantId }) {
    const entrantPromise = EntrantService.get(entrantId);
    const facultyPromise = FacultyService.get(facultyId);
    const [entrant, faculty] = await Promise.all([entrantPromise, facultyPromise]);
    if (!entrant || !faculty) throw new Error('Cannot find entrant or faculty with given id');
    const application = await Application.findOne({
        entrant: entrant._id,
        faculty: faculty._id,
    });
    if (application) {
        throw new Error('Application is already exists');
    }
    return Application.create({
        faculty: facultyId,
        entrant: entrantId,
    });
}

function getList() {
    return Application.find({}).exec();
}

function get(id) {
    return Application.findById(id);
}

function remove(id) {
    return Application.remove({ _id: id });
}

function update(id, application) {
    const validApplication = _pick(application, fields);
    return Application.findByIdAndUpdate(id, { $set: validApplication }, { new: true });
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
