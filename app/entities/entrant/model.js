const mongoose = require('mongoose');

const EntrantSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    patronymic: String,
    sex: Boolean,
    dateOfBirth: Date,
});
mongoose.model('Entrant', EntrantSchema);

module.exports = mongoose.model('Entrant');
