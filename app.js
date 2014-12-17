var restify = require('restify');
var socket = require('socket.io');

var server = restify.createServer();
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.pre(restify.pre.sanitizePath());
server.use(restify.requestLogger());
server.use(restify.bodyParser({
    maxBodySize: 0,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    multipartHandler: function(part) {
        part.on('data', function(data) {
            console.log(data);
        });
    },
    multipartFileHandler: function(part) {
        part.on('data', function(data) {
            console.log(data);
        });
    },
    keepExtensions: false,
    uploadDir: './'
}));

server.get('/:name', function respond(req, res) {
        res.send('hello ' + req.params.name);
    }
);

server.get('/note/:name', function respond(req, res) {
        res.send('hello ' + req.params.name);
    }
);

server.get(/.*/, restify.serveStatic({
    directory: __dirname + '/client',
    default: 'index.html'
}));


server.listen(3032, function() {
    console.log('%s listening at %s', server.name, server.url);
});


/*
var express = require('express');
var app = express();

var restrict = function (req, res, next) {
    // if no session, go to login
    res.redirect('/login');

    next();
};


app.get('/', function (req, res) {
    // root to stats
    res.redirect('/stat');
});

app.get('/login', function (req, res) {
    // login with request to cloud core api
});

app.get('/stats', restrict, function (req, res) {
    // render stats for list
});

app.get('/:article_id/:page_id', function (req, res) {
    // render list pages, if no page_id then render only one page
});

app.get('/:article_id?/setup', restrict, function (req, res) {
    // page setup, if no article_id go to add article with setup
});

app.post('/:article_id?/setup', restrict, function (req, res) {
    // save data to local sqlite engine with orm
});
*/
