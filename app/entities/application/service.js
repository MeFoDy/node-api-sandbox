const _pick = require('lodash/pick');
const { fields } = require('./model');
const ApplicationRepository = require('./repository');
const EntrantService = require('../entrant/service');
const FacultyService = require('../faculty/service');

async function create({ facultyId, entrantId }) {
    const entrant = await EntrantService.get(entrantId);
    const faculty = await FacultyService.get(facultyId);
    if (!entrant || !faculty) throw new Error('Cannot find entrant or faculty with given id');
    const application = await ApplicationRepository.find({
        entrantId: entrant._id,
        facultyId: faculty._id,
    });
    if (application) {
        throw new Error('Application is already exists');
    }
    return ApplicationRepository.create({
        faculty: facultyId,
        entrant: entrantId,
    });
}

function getList() {
    return ApplicationRepository.getList();
}

function get(id) {
    return ApplicationRepository.get(id);
}

function remove(id) {
    return ApplicationRepository.remove(id);
}

function update(id, application) {
    const validApplication = _pick(application, fields);
    return ApplicationRepository.update(id, validApplication);
}

module.exports = {
    create,
    get,
    getList,
    remove,
    update,
};
