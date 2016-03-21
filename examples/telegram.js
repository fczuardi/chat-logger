// # Telegram example

import { createStore } from 'redux';

// import { loggerReducer, debugState } from 'chat-logger';
// import { connect as connectToTelegram } from 'chat-logger';
// import { addBotUser, startTelegramRelay } from 'chat-logger';
import { loggerReducer } from '../src/lib/loggerReducer';
import { debugState } from '../src/lib/debug';
import { connect as connectToTelegram } from '../src/lib/telegramHelpers';
import { addBotUser, startRelay as startTelegramRelay } from '../src/lib/telegramHelpers';

let tokens = process.env.TELEGRAM_KEY ? process.env.TELEGRAM_KEY.split(' ') : [''];
let store = createStore(loggerReducer);
store.subscribe(() => { debugState(store); });

tokens.forEach( (token) => {
    connectToTelegram(token, store).then( (connection) => {
        addBotUser(token, store).then( (user) => {
            startTelegramRelay(token, store);
        }, console.error);
    }, console.error);
});
