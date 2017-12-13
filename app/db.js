const mongoose = require('mongoose');
const dbConfig = require('../config/db');

mongoose.Promise = Promise;

const options = {
    useMongoClient: true,
};
const connectionString = process.env.NODE_ENV === 'test' ?
    dbConfig.connectionStringTest :
    dbConfig.connectionString;
mongoose.connect(connectionString, options);
