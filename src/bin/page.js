import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { createElement, DOM } from 'react';
import { html } from 'js-beautify';
import Page from '../templates/Page.jsx';
import App from '../components/App';
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

function printHTML() {
    let appHTML = html(renderToString(
        createElement(App, {initialState: initialState})
    ));

    let baseHTML = html(renderToStaticMarkup(
        createElement(Page, pageProps,
            DOM.div({id: 'main-app'}),
            DOM.script({
                dangerouslySetInnerHTML: {
                    '__html': 'var initialState = ' +
                                JSON.stringify(initialState)
                }
            })
        )
    ));

    let matches = baseHTML.match(/([\s\S]*main-app[^>]*>)([^<]*)(<[\s\S]*)/m);
    console.log(matches[1] + appHTML + matches[3]);
}

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
                printHTML();
            });
        })
    });
} else {
    printHTML();
}
