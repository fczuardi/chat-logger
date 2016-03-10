import amqp from 'amqplib';
import { CONNECTED_TO_AMQ } from '../src/actionTypes';

export async function connectAndDispatch(url, store){
    try{
        let conn = await amqp.connect();
        store.dispatch({
            type: CONNECTED_TO_AMQ,
            url: url,
            api: conn
        });
    }catch(err){
        console.warn(err);
    }
}
