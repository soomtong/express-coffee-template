exports.server = function serverConfig(option) {
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

exports.database = function databaseConfig(option) {
    var config = {};

    return config[option.mode];
};