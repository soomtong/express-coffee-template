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
