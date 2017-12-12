const app = require('./app');
const logger = require('./app/utils/logger');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    logger.info(`Express server listening on port ${port}`);
});

module.exports = server;
