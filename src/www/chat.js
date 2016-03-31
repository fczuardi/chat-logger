import { parse as qsParse} from 'query-string';
import { createElement } from 'react';
import { connect } from 'rethinkdb-websocket-client';
import { setupRethinkDBMiddleware } from '../lib/rethinkdbHelpers';
import { logActionsMiddleware } from '../lib/debug';
import ReactDOM from 'react-dom';
import App from '../components/InteractiveChat';

//@TODO configure rollup to use env vars instead of hardcoding those values
const options = {
  host: 'localhost',       // hostname of the websocket server
  port: 8000,              // port number of the websocket server
  path: '/',               // HTTP path to websocket route
  wsProtocols: ['binary'], // sub-protocols for websocket, required for websockify
  secure: false,           // set true to use secure TLS websockets
  db: 'chat_logger',       // default database, passed to rethinkdb.connect
  simulatedLatencyMs: 100, // wait 100ms before sending each message (optional)
};

function startApp(initialState){
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
}

let parsedQueryString = qsParse(window.location.search);
console.log('parsedQueryString', parsedQueryString);
let chatId = parsedQueryString.chatId;

startApp({
    ...window.initialState,
    currentSession:{
        ...window.initialState.currentSession,
        chatId: chatId,
        sessionConfigForm:{
            ...window.initialState.currentSession.sessionConfigForm,
            chatIdInput: chatId
        }
    }
});
