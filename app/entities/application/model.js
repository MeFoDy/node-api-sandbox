const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const fields = {
    entrant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entrant',
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty',
    },
    isProcessed: {
        type: Boolean,
        default: false,
    },
};
const ApplicationSchema = new mongoose.Schema(fields);
ApplicationSchema.plugin(timestamps);
const ApplicationModel = mongoose.model('Application', ApplicationSchema);

module.exports = {
    schema: ApplicationSchema,
    model: ApplicationModel,
    fields: Object.getOwnPropertyNames(fields),
};
