import { pageHTML } from '../www/html';
import r from 'rethinkdb';

let title = 'Web UI demo';
let pageProps = {
    lang: 'en',
    charSet: 'utf-8',
    title: title,
    stylesheets: [
    ],
    scripts: [
        './lib/js/babel-helpers.js',
        './lib/js/react.js',
        './lib/js/react-dom.js',
        './lib/js/react-redux.js',
        './lib/js/redux.js',
        './lib/js/lodash-custom.js',
        './js/main.js'
    ]
};

let initialState = {
    messages: []
};


if (process.env.STORAGE === 'rethinkdb'){
    let options = {
        host: process.env.RETHINKDB_HOST || 'localhost',
        port: process.env.RETHINKDB_PORT || '28015',
        db: process.env.RETHINKDB_NAME || 'test'
    }
    r.connect(options).then( (conn) => {
        r.table('messages').orderBy('date').run(conn, (err, cursor) => {
            cursor.each( (err, row) => {
                initialState.messages.push(row);
            }, () => {
                cursor.close();
                conn.close();
                console.log(pageHTML(pageProps, initialState));
            });
        })
    });
} else {
    console.log(pageHTML(pageProps, initialState));
}
