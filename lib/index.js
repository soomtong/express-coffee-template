require('./init-check').check();

module.exports = {
    createServer: require('./server').createServer
};