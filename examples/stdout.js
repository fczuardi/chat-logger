// # Redux Standard Output example
//
// A sample of how you can use loggerReducer in a Redux app.
// This example illustrates:
//   - the setup of a redux store using loggerReducer as the reducer
//   - subscribe to all state changes and print the new state to standard output
//   - connect multiple bots to telegram based on a env var with
// tokens separeted by space
//   - use the ADD_USER action to fill up the bot users info under the users
// object and add their telegram id on the connections object
//   - setup a listener for the Update event from telegram API on every
// connection and dispatch an ADD_MESSAGE action to push the new message to the
// messages list.


import { createStore } from 'redux';

// Uncomment the 2 lines below and comment the other 2 to run this example using the npm package
// import { CONNECT_TO_TELEGRAM, ADD_USER, ADD_MESSAGE } from 'chat-logger';
// import { loggerReducer } from 'chat-logger';
import { CONNECT_TO_TELEGRAM, ADD_USER, ADD_MESSAGE } from '../src/actionTypes';
import { loggerReducer } from '../src/loggerReducer';
import telegram from 'telegram-bot-api';

let tokens = process.env.TELEGRAM_KEY.split(' ');
let store = createStore(loggerReducer);
store.subscribe(() => {
    console.log(
`
State
=====
${JSON.stringify(store.getState(), ' ', 2)}
`
    );
});

tokens.forEach( (token) => {
    let api = new telegram({
        token: token,
        updates: {
            enabled: true
        }
    });
    store.dispatch({
        type: CONNECT_TO_TELEGRAM,
        token: token,
        api: api
    });
    let connection = store.getState().connections[token];
    connection.api.getMe().then( (user) => {
        store.dispatch({
            type: ADD_USER,
            user: user,
            connection: connection
        });
    })
    .catch( (error) => {
        console.error(error);
    });
});

let connections = store.getState().connections;
for (var connectionToken in connections){
    let connection = connections[connectionToken];
    connection.api.on('message', (message) => {
        store.dispatch({
            type: ADD_MESSAGE,
            id: message.message_id,
            date: message.date,
            text: message.text,
            from: message.from,
            chat: message.chat,
            connection: connection
        })
    });
}
