// # Telegram example
import { inspect } from 'util';
import { createStore, applyMiddleware } from 'redux';
import { loggerReducer } from '../src/lib/loggerReducer';
import { ADD_MESSAGE } from '../src/lib/actionTypes';
import { debugState } from '../src/lib/debug';
import { connect as connectToTelegram } from '../src/lib/telegramHelpers';
import { addBotUser, startRelay as startTelegramRelay } from '../src/lib/telegramHelpers';
import r from 'rethinkdb';
import {TABLES} from '../src/lib/rethinkdbHelpers';

let tokens = process.env.TELEGRAM_KEY ? process.env.TELEGRAM_KEY.split(' ') : [''];
let options = {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: process.env.RETHINKDB_PORT || '28015',
    db: process.env.RETHINKDB_NAME || 'test'
}

function setupMiddleWare(conn){
    return store => next => action => {
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
        let result = next(action);
        switch(action.type){
            case ADD_MESSAGE:
                //@TODO this date conversion maybe belong to a middleware
                if (provider === 'telegram'){
                    //telegram api uses seconds after epoch instead of miliseconds
                    date = date * 1000;
                }
                chatId = chatId || chat.id;
                userId = userId || from.id;
                //convert numeric ids to string
                id += '';
                chatId += '';
                userId += '';
                loggerId += '';
                let newMessage = { id, date, text, loggerId, provider, chatId, userId };
                r.table(TABLES.messages).insert(
                    newMessage, {returnChanges: true}
                ).run(conn, function(err, result) {
                    if (err) throw err;
                    console.log(JSON.stringify(result, null, 2));
                });
            default:
                break;
        }
        return result;
    };
}

console.log(inspect(options));
r.connect(options).then( (conn) => {
    console.log('connected');
    let updateDB = setupMiddleWare(conn);
    let store = createStore(loggerReducer, applyMiddleware(updateDB));
    store.subscribe(() => {
        debugState(store);
    });
    tokens.forEach( (token) => {
        connectToTelegram(token, store).then( (connection) => {
            addBotUser(token, store).then( (user) => {
                startTelegramRelay(token, store);
            }, console.error);
        }, console.error);
    });
}).catch((err) => {
    throw err;
});
