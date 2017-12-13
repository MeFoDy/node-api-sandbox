const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const fields = {
    name: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    description: String,
    capacity: {
        type: Number,
        required: true,
        default: 0,
    },
};
const FacultySchema = new mongoose.Schema(fields);
FacultySchema.plugin(timestamps);
const FacultyModel = mongoose.model('Faculty', FacultySchema);

module.exports = {
    schema: FacultySchema,
    model: FacultyModel,
    fields: Object.getOwnPropertyNames(fields),
};
