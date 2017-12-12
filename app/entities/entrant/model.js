const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const fields = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    patronymic: String,
    sex: {
        type: Boolean,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
};
const EntrantSchema = new mongoose.Schema(fields);
EntrantSchema.plugin(timestamps);
mongoose.model('Entrant', EntrantSchema);

module.exports = {
    model: mongoose.model('Entrant'),
    fields: Object.getOwnPropertyNames(fields),
};
