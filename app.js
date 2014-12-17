var mode = process.env['NODE_ENV'] || 'development';

var config = require('./config');
var harookit = require('./lib');

var server = harookit.createServer(config.server(mode));

server.listen(3032, function() {
    console.log('%s listening at %s', server.name, server.url);
});
