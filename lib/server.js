"use strict";

var restify = require('restify');
var socket = require('socket.io');

function createServer(config, db) {
    var server = restify.createServer();
    var io = socket.listen(server);

    var doc = { hello: 'world'
        , n: 5
        , today: new Date()
        , nedbIsAwesome: true
        , notthere: null
        , notToBeSaved: undefined  // Will not be saved
        , fruits: [ 'apple', 'orange', 'pear' ]
        , infos: { name: 'nedb' }
    };


    db.users.insert(doc, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });

    console.log(db);

    io.sockets.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

    //server.pre(restify.pre.sanitizePath());

    server.use(restify.requestLogger({
        name: config.name,
        level: (process.env.LOG_LEVEL || 'info'),
        serializers: restify.bunyan.serializers
    }));

    server.use(restify.throttle({
        burst: 10,
        rate: 5,
        ip: true
    }));

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
        uploadDir: 'public'
    }));

    server.get('/article/:name', function respond(req, res) {
            res.send('hello ' + req.params.name);
        }
    );

    server.get('/note/:name', function respond(req, res) {
            res.send('hello ' + req.params.name);
        }
    );

    server.get(/.*/, restify.serveStatic({
        directory: config.root + '/public',
        default: 'index.html'
    }));

    return server;
}


module.exports = createServer;


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
