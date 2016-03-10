import amqp from 'amqplib';
import { CONNECTED_TO_AMQ } from '../src/actionTypes';

export async function connect(url, store){
    try{
        let api = await amqp.connect();
        let connection = {
            id: url,
            api: api
        };
        store.dispatch({
            type: CONNECTED_TO_AMQ,
            ...connection
        });
        return connection;
    }catch(err){
        console.warn(err);
    }
}
