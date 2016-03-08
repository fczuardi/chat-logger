import { createStore } from 'redux';
import { CONNECT_TO_TELEGRAM, ADD_USER, ADD_MESSAGE } from './src/actionTypes';
import { loggerReducer } from './src/loggerReducer';

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
    store.dispatch({
        type: CONNECT_TO_TELEGRAM,
        token: token
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
