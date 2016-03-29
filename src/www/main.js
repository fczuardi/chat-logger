// main.js
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { rethinkdb as r, connect } from 'rethinkdb-websocket-client';
import { ADD_MESSAGE } from '../lib/actionTypes';
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

var dbConnection;

connect(options).then(function(conn) {
    dbConnection = conn;
});


let initialState = window.initialState || { messages: [] };

const logActions = store => next => action => {
    console.log('action', action);
    return next(action);
}

const webSocketSendMessages = store => next => action => {
    if (dbConnection !== undefined && action.type === ADD_MESSAGE){
        console.log('update db!', action.payload);
        let {
            id,
            chatId,
            userId,
            loggerId,
            date,
            text,
            provider,
            chat,
            from
        } = action.payload;
        let newMessage = { id, date, text, loggerId, provider, chatId, userId };
        var query = r.table('messages').insert(newMessage);
        query.run(dbConnection, function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });

    }
    return next(action);
}

ReactDOM.render(
    createElement(App, {
        initialState: initialState,
        middlewares: [
            logActions,
            webSocketSendMessages
        ]
    }),
    document.getElementById('main-app')
);
