import amqp from 'amqplib';
import { SETUP_AMQ } from '../src/actionTypes';

export async function connect(url, store){
    try{
        let api = await amqp.connect();
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
