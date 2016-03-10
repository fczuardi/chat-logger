import telegram from 'telegram-bot-api';
import { CONNECTED_TO_TELEGRAM, ADD_USER } from '../src/actionTypes';

function connect(token, store){
    let api = new telegram({
        token: token,
        updates: {
            enabled: true
        }
    });
    let connection = {
        id: token,
        api: api
    };
    store.dispatch({
        type: CONNECTED_TO_TELEGRAM,
        ...connection
    });
    return connection;
}

async function addBotUser(store, connection){
    try{
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

export async function connectAndAddLoggerUser(token, store){
    let connection = connect(token, store);
    try{
        return await addBotUser(store, connection);
    }catch(e){
        console.warn(e);
    }
};
