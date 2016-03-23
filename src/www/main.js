// main.js
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

let initialState = window.initialState || { messages: [] };
ReactDOM.render(
    createElement(App, {initialState: initialState}),
    document.getElementById('main-app')
);
