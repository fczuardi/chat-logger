import { inspect } from 'util';
import telegram from 'telegram-bot-api';
import { CONNECTED_TO_TELEGRAM, ADD_USER, ADD_MESSAGE } from '../src/actionTypes';

export function connect(token, store){
    let api = new telegram({
        token: token,
        updates: {
            enabled: true
        }
    });
    let connection = {
        id: token,
        api: api,
        loggerId: null
    };
    store.dispatch({
        type: CONNECTED_TO_TELEGRAM,
        ...connection
    });
    return connection;
}

export async function addBotUser(token, store){
    try{
        let connection = store.getState().connections[token];
        let user = await connection.api.getMe();
        store.dispatch({
            type: ADD_USER,
            user: user,
            connectionId: connection.id
        });
        return user;
    }catch(e){
        console.warn(e);
    }
}

export function addMessage(token, store, message){
    let connection = store.getState().connections[token];
    let chatMessage = {
        id: message.message_id,
        date: message.date,
        text: message.text,
        chat: message.chat,
        from: message.from,
        loggerId: connection.loggerId
    };
    console.log('addMessage', inspect(chatMessage));
    store.dispatch({
        type: ADD_MESSAGE,
        ...chatMessage
    });
    return chatMessage;
}

export function startTelegramRelay(token, store){
    let connection = store.getState().connections[token];
    connection.api.on('message', (message) => {
        addMessage(token, store, message);
    });
}

export async function connectAndAddLoggerUser(token, store){
    let connection = connect(token, store);
    try{
        return await addBotUser(token, store);
    }catch(e){
        console.warn(e);
    }
};
