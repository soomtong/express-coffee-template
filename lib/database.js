"use strict";

var neDB = require('nedb');
var db = {};

function initDatabase(config, callback) {
    db.users = new neDB(config.database.dir + config.database.file.user);
    db.logs = new neDB(config.database.dir + config.database.file.log);

    // You need to load each database (here we do it asynchronously)
    db.users.loadDatabase();
    db.logs.loadDatabase();

    callback(db);
}

module.exports = initDatabase;