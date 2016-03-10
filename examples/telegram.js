// # Telegram example

import { inspect } from 'util';
import { createStore } from 'redux';

// import { loggerReducer } from 'chat-logger';
// import { connectAndAddLoggerUser as connectToTelegram, startTelegramRelay} from 'chat-logger';
import { loggerReducer } from '../src/loggerReducer';
import { connectAndAddLoggerUser as connectToTelegram, startTelegramRelay } from '../src/telegramHelpers';

let tokens = process.env.TELEGRAM_KEY.split(' ');
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
    let botUserPromise = connectToTelegram(token, store);
    botUserPromise.then( () => {
        startTelegramRelay(token, store);
    }, console.warn);
});
