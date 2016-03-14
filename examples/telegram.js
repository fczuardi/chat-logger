// # Telegram example

import { inspect } from 'util';
import { createStore } from 'redux';

// import { loggerReducer } from 'chat-logger';
// import { connect as connectToTelegram } from 'chat-logger';
// import { addBotUser, startTelegramRelay } from 'chat-logger';
import { loggerReducer } from '../src/loggerReducer';
import { connect as connectToTelegram } from '../src/telegramHelpers';
import { addBotUser, startRelay as startTelegramRelay } from '../src/telegramHelpers';

let tokens = process.env.TELEGRAM_KEY ? process.env.TELEGRAM_KEY.split(' ') : [''];
let store = createStore(loggerReducer);
store.subscribe(() => {
    console.log(
`
State
=====
${inspect(store.getState())}
`
    );
});

tokens.forEach( (token) => {
    connectToTelegram(token, store).then( (connection) => {
        addBotUser(token, store).then( (user) => {
            startTelegramRelay(token, store);
        }, console.error);
    }, console.error);
});
