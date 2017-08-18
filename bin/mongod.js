const exec = require('child_process').exec;
const config = require('../dist/config').default;

exec(`mongod --dbpath ${config.database.path} --port ${config.database.port}`);
