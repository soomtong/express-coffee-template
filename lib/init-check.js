"use strict";

var packages = require('../package.json'),
    path = require('path'),
    crypto = require('crypto'),
    fs = require('fs'),
    mode = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV,
    appRoot = path.resolve(__dirname, '../'),
    configFilePath = path.join(appRoot, 'config.js');

var checks = {
    check: function check() {
        this.config();
        this.packages();
        this.contentPath();
        this.sqlite();
    },

    // Config file
    config: function checkConfigFile() {
        var configFile = configFilePath,
            fd,
            errorHeader = 'ERROR: Unable to access harookit\'s config file:',
            errorHelp = 'Check that the file exists and file system permissions are correct.';

        // Check the root content path
        try {
            fd = fs.openSync(configFile, 'r');
            fs.closeSync(fd);
        } catch (e) {
            console.error(errorHeader);
            console.error('  ' + e.message);
            console.error('\n' + errorHelp);

            process.exit(0);
        }
    },
    // Make sure package.json dependencies have been installed.
    packages: function checkPackages() {
        if (mode !== 'production' && mode !== 'development') {
            return;
        }

        var errors = [];

        Object.keys(packages.dependencies).forEach(function (p) {
            try {
                require.resolve(p);
            } catch (e) {
                errors.push(e.message);
            }
        });

        if (!errors.length) {
            return;
        }

        errors = errors.join('\n  ');

        console.error('ERROR: harookit is unable to start due to missing dependencies:\n  ' + errors);
        console.error('\nPlease run `npm install --production` and try starting harookit again.');

        process.exit(0);
    },

    // Check content path permissions
    contentPath: function checkContentPaths() {
        if (mode !== 'production' && mode !== 'development') {
            return;
        }

        var configFile,
            config,
            contentPath,
            contentSubPaths = ['data', 'images', 'themes'],
            fd,
            errorHeader = 'ERROR: Unable to access harookit\'s content path:',
            errorHelp = 'Check that the content path exists and file system permissions are correct.';

        // Get the content path to test.  If it's defined in config.js use that, if not use the default
        try {
            configFile = require(configFilePath);
            config = configFile.get({mode: mode});

            if (config && config.paths && config.paths.contentPath) {
                contentPath = config.paths.contentPath;
            } else {
                contentPath = path.join(appRoot, 'content');
            }
        } catch (e) {
            // If config.js doesn't exist yet, check the default content path location
            contentPath = path.join(appRoot, 'content');
        }

        // Use all sync io calls so that we stay in this function until all checks are complete

        // Check the root content path
        try {
            fd = fs.openSync(contentPath, 'r');
            fs.closeSync(fd);
        } catch (e) {
            console.error(errorHeader);
            console.error('  ' + e.message);
            console.error('\n' + errorHelp);

            process.exit(0);
        }

        // Check each of the content path subdirectories
        try {
            contentSubPaths.forEach(function (sub) {
                var dir = path.join(contentPath, sub),
                    randomFile = path.join(dir, crypto.randomBytes(8).toString('hex'));

                fd = fs.openSync(dir, 'r');
                fs.closeSync(fd);

                // Check write access to directory by attempting to create a random file
                fd = fs.openSync(randomFile, 'wx+');
                fs.closeSync(fd);
                fs.unlinkSync(randomFile);
            });
        } catch (e) {
            console.error(errorHeader);
            console.error('  ' + e.message);
            console.error('\n' + errorHelp);

            process.exit(0);
        }
    },

    // Make sure sqlite3 database is available for read/write
    sqlite: function checkSqlite() {
        if (mode !== 'production' && mode !== 'development') {
            return;
        }

        var configFile,
            config,
            appRoot = path.resolve(__dirname, '../'),
            dbPath,
            fd;

        try {
            configFile = require(configFilePath);
            config = configFile.get({mode: mode});

            // Abort check if database type is not sqlite3
            if (config && config.database && config.database.client !== 'sqlite3') {
                return;
            }

            if (config && config.database && config.database.connection) {
                dbPath = config.database.connection.filename;
            }
        } catch (e) {
            // If config.js doesn't exist, use the default path
            dbPath = path.join(appRoot, 'content', 'data', mode === 'production' ? 'harookit.db' : 'harookit-dev.db');
        }

        // Check for read/write access on sqlite db file
        try {
            fd = fs.openSync(dbPath, 'r+');
            fs.closeSync(fd);
        } catch (e) {
            // Database file not existing is not an error as sqlite will create it.
            if (e.code === 'ENOENT') {
                return;
            }

            console.error('ERROR: Unable to open sqlite3 database file for read/write');
            console.error('  ' + e.message);
            console.error('\nCheck that the sqlite3 database file permissions allow read and write access.');

            process.exit(0);
        }
    }
};

module.exports = checks;