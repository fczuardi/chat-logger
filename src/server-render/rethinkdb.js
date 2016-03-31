import r from 'rethinkdb';
import { pageHTML, DEFAULTSCRIPTS } from '../www/html';
import App from '../components/ReadOnlyLog';
import {TABLES} from '../lib/rethinkdbHelpers';


let title = 'Web UI demo';
let pageProps = {
    lang: 'en',
    charSet: 'utf-8',
    title: title,
    stylesheets: [],
    scripts: DEFAULTSCRIPTS
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
        r.table(TABLES.messages).orderBy('date').run(conn, (err, cursor) => {
            cursor.each( (err, row) => {
                initialState.messages.push(row);
            }, () => {
                cursor.close();
                conn.close();
                console.log(pageHTML(pageProps, initialState, App));
            });
        })
    });
} else {
    console.log(pageHTML(pageProps, initialState, App));
}
