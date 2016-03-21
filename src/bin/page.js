import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { createElement, DOM } from 'react';
import { html } from 'js-beautify';
import Page from '../templates/Page.jsx';
import App from '../components/App';

let title = 'Web UI demo';
let pageProps = {
    lang: 'en',
    charSet: 'utf-8',
    title: title,
    stylesheets: [
    ],
    scripts: [
        './lib/js/babel-helpers.js',
        './js/chat-logger-reducer.js',
    ]
};

let appHTML = html(renderToString(
    createElement(App)
));

let baseHTML = html(renderToStaticMarkup(
    createElement(Page, pageProps,
        DOM.div({id: 'main-app'})
    )
));

let output = baseHTML.replace(/(.*main-app[^>]*>)([^<]*)(<.*)/ig, `$1${appHTML}$3`);

console.log(output);
