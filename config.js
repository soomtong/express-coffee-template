var SERVICE_NAME = 'harookit';

var server = function serverConfig(option) {
    var config = {
        'production': {
            port: 3032
        },
        'development': {
            port: 3032
        }
    };

    return config[option.mode];
};

var database = function databaseConfig(option) {
    var config = {};

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