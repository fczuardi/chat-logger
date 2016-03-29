// main.js
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'rethinkdb-websocket-client';
import { setupRethinkDBMiddleware } from '../lib/rethinkdbHelpers';
import { logActionsMiddleware } from '../lib/debug';
import App from '../components/InteractiveChat';

//@TODO configure rollup to use env vars instead of hardcoding those values
var options = {
  host: 'localhost',       // hostname of the websocket server
  port: 8000,              // port number of the websocket server
  path: '/',               // HTTP path to websocket route
  wsProtocols: ['binary'], // sub-protocols for websocket, required for websockify
  secure: false,           // set true to use secure TLS websockets
  db: 'chat_logger',       // default database, passed to rethinkdb.connect
  simulatedLatencyMs: 100, // wait 100ms before sending each message (optional)
};

let initialState = window.initialState || { messages: [] };

connect(options).then(function(conn) {
    let webSocketSendMessages = setupRethinkDBMiddleware(conn);
    ReactDOM.render(
        createElement(App, {
            initialState: initialState,
            middlewares: [
                logActionsMiddleware,
                webSocketSendMessages
            ],
            connection: conn
        }),
        document.getElementById('main-app')
    );
});
