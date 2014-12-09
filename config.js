var path = require('path');
var config;

config = {
    production: {
        url: 'http://my-harookit-blog.com',
        mail: {},
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/harookit.db')
            },
            debug: false
        },

        server: {
            host: '127.0.0.1',
            port: '3032'
        }
    },
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:3032',

        // Example mail config
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/harookit-dev.db')
            },
            debug: false
        },
        server: {
            host: '127.0.0.1',
            port: '3032'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },
    testing: {
        url: 'http://127.0.0.1:3032',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/harookit-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '3032'
        },
        logging: false
    }
};

module.exports = config;