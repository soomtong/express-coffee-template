"use strict";
var path = require('path');

var SERVICE_NAME = 'harookit';

var server = function serverConfig(option) {
    var config = {
        'production': {
            port: 3032
        },
        'development': {
            port: 3032
        },
        'testing': {
            host: '127.0.0.1',
            port: 3032
        }
    };

    return config[option.mode];
};

var database = function databaseConfig(option) {
    var config = {
        'production': {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/harookit.db')
            },
            debug: false
        },
        'development': {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/harookit.db')
            },
            debug: false
        }
    };

    return config[option.mode];
};

module.exports = {
    get: function getConfiguration(option) {
        return {
            name: SERVICE_NAME,
            server: server(option),
            database: database(option)
        };
    }
};