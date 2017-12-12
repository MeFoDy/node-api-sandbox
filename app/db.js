const mongoose = require('mongoose');
const dbConfig = require('../config/db');

mongoose.Promise = Promise;

const options = {
    useMongoClient: true,
};
mongoose.connect(dbConfig.connectionString, options);
