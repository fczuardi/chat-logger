import { renderToString } from 'react-dom/server';
import { createElement, DOM } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loggerReducer } from '../loggerReducer';
// import { html } from 'js-beautify';
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
        './js/main.js'
    ]
};

let store = createStore(loggerReducer);


// let output = html(renderToString(
let output = (renderToString(
    createElement(Provider, {'store': store},
        createElement(Page, pageProps,
            createElement(App),
            DOM.script()
        )
    )
));

console.log(output);
