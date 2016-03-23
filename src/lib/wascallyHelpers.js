import { find } from 'lodash/fp';
import { parse as parseURL } from 'url';
import { inspect } from 'util';
//patch wascally this way to allow access to the Broker class:
// https://github.com/fczuardi/wascally/commit/d707ca283b1aefa67a2e7d1b5bd67612decf2a9c
import { Broker as rabbitBroker } from 'wascally';
import { SETUP_AMQ, ADD_MESSAGE } from './actionTypes';

function connectionSettingsFromURL(url = 'amqp://guest:guest@localhost:5672'){
    let { auth, hostname, port, path } = parseURL(url),
        [user, pass] = auth ? auth.split(':') : ['guest', 'guest'],
        server = [hostname],
        vhost = path ? path.substr(1) : null;
    return { user, pass, server, port, vhost };
};

function buildSettings(url, exchangeNames){
    return {
        connection: connectionSettingsFromURL(url),
        exchanges: exchangeNames.map( (name) => ({
            name: name,
            type: 'fanout',
            autoDelete: true
        })),
        queues: exchangeNames.map( (name) => ({
            name: name + '-queue',
            autoDelete: true,
            subscribe: true
        })),
        bindings: exchangeNames.map( (name) => ({
            exchange: name,
            target: name + '-queue',
            keys: []
        }))
    }
};

export async function connect(url, fanoutExchanges, store){
    let settings = buildSettings(url, fanoutExchanges);
    console.log('settings', inspect(settings));
    try{
        let api = new rabbitBroker();
        let configurationOutput = await api.configure(settings);
        let connection = {
            id: url,
            api: api,
            loggerId: null
        };
        store.dispatch({
            type: SETUP_AMQ,
            ...connection
        });
        return connection;
    }catch(err){
        throw err;
    }
};

export function addMessage(url, store, rabbitMessage){
    let connection = find({id: url}, store.getState().connections);
    let message = rabbitMessage.body;
    let chatMessage = {
        id: message.message_id,
        date: message.date,
        text: message.text,
        loggerId: message.bot_id,
        provider: message.provider,
        chatId: message.chat_id,
        userId: message.user_id
    };
    store.dispatch({
        type: ADD_MESSAGE,
        ...chatMessage
    });
    return chatMessage;
}

export async function startRelay(url, store){
    let connection = find({id: url}, store.getState().connections);
    //to make the example simple, we don't expect any particular typeName
    connection.api.onUnhandled( (message) => {
        // console.log(inspect(message));
        addMessage(url, store, message);
        message.ack();
    } );
};
