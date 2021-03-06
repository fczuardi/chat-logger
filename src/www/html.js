import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { createElement, DOM } from 'react';
import { html } from 'js-beautify';
import Page from '../templates/Page.jsx';

function pageHTML(pageProps, initialState, App) {
    let appHTML = (renderToString(
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
    return matches[1] + appHTML + matches[3];
}

const DEFAULTSCRIPTS = [
    './lib/js/babel-helpers.js',
    './lib/js/redux.js',
    './lib/js/react.js',
    './lib/js/react-dom.js',
    './lib/js/react-redux.js',
    './lib/js/lodash-custom.js',
    './lib/js/crypto.js',
    './lib/js/uuid.js',
    './lib/js/rethinkdb-websocket-client.js',
    './lib/js/query-string.js'
];

export { DEFAULTSCRIPTS, pageHTML };
