import { inspect } from 'util';
import { find } from 'lodash/fp';
import telegram from 'telegram-bot-api';
import { SETUP_TELEGRAM, ADD_USER, ADD_MESSAGE } from './actionTypes';

export async function connect(token, store){
    let api = new telegram({
        token: token,
        updates: {
            enabled: true
        },
        throw_errors: true
    });
    let connection = {
        id: token,
        api: api,
        loggerId: null
    };
    store.dispatch({
        type: SETUP_TELEGRAM,
        ...connection
    });
    return Promise.resolve(connection);
}

export async function addBotUser(token, store){
    let connection = find({id: token}, store.getState().connections);
    try{
        let user = await connection.api.getMe();
        store.dispatch({
            type: ADD_USER,
            user: user,
            connectionId: token
        });
        return user;
    } catch(err){
        throw err;
    }
}

export function addMessage(token, store, message){
    let connection = find({id: token}, store.getState().connections);
    let chatMessage = {
        id: message.message_id,
        date: message.date,
        text: message.text,
        chat: message.chat,
        from: message.from,
        loggerId: connection.loggerId,
        provider: 'telegram'
    };
    store.dispatch({
        type: ADD_MESSAGE,
        ...chatMessage
    });
    return chatMessage;
}

export function startRelay(token, store){
    let connection = find({id: token}, store.getState().connections);
    return connection.api.on('message', (message) => {
        addMessage(token, store, message);
    });
}
