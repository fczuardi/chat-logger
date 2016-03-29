// main.js
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import App from '../components/InteractiveChat';
import { rethinkdb as r, connect } from 'rethinkdb-websocket-client';

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

connect(options).then(function(conn) {
  var query = r.table('messages');
  query.run(conn, function(err, cursor) {
    cursor.toArray(function(err, results) {
      console.log(results);
    });
  });
});


let initialState = window.initialState || { messages: [] };

const logActions = store => next => action => {
    console.log('action', action);
    return next(action);
}

const webSocketSendMessages = store => next => action => {
    return next(action);
}

ReactDOM.render(
    createElement(App, {
        initialState: initialState,
        middlewares: [
            logActions
        ]
    }),
    document.getElementById('main-app')
);
