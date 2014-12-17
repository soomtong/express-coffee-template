var mode = process.env['NODE_ENV'] || 'development';

var config = require('./config').server({mode: mode});
var harookit = require('./lib');

var server = harookit.createServer(config);

server.listen(config.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
