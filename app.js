"use strict";

var mode = process.env.NODE_ENV || 'development';

var config = require('./config').get({mode: mode});
var harookit = require('./lib');

// todo: cluster mode and singleton server instance
var server = harookit.createServer(config);

server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
