import { find } from 'lodash/fp/collection';
import amqp from 'amqplib';
import { SETUP_AMQ, ADD_MESSAGE } from './actionTypes';

export async function connect(url, store){
    try{
        let api = await amqp.connect(url);
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
}

export function addMessage(url, store, buffer){
    let connection = find({id: url}, store.getState().connections);
    let message = JSON.parse(buffer.content.toString());
    // this example expects json encoded strings in the queue that are objects
    // containing parameters message_id, date, text, chat_id, user_id, source
    if (!message.message_id || !message.text){
        return null;
    }
    let chatMessage = {
        id: message.message_id,
        date: message.date,
        text: message.text,
        loggerId: null,
        chatId: message.chat_id,
        userId: message.user_id
    };
    store.dispatch({
        type: ADD_MESSAGE,
        ...chatMessage
    });
    return chatMessage;
}

export async function startRelay(url, queueName, store){
    let connection = find({id: url}, store.getState().connections);
    try{
        let channel = await connection.api.createChannel();
        let queueExists = channel.checkQueue(queueName);
        channel.consume(queueName, (message) => {
            addMessage(url, store, message);
            channel.ack(message);
        }, {noAck: false});
    }catch (err){
        throw err;
    }
}
