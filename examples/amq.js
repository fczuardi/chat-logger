import { createStore } from 'redux';
import { CONNECT_TO_AMQ } from '../src/actionTypes';
import { loggerReducer } from '../src/loggerReducer';
import amqp from 'amqplib';

let queueUrl = process.env.AMQ_URL;
let store = createStore(loggerReducer);
let api = amqp.connect();

api.then( (conn) => {
    store.dispatch({
        type: CONNECT_TO_AMQ,
        url: queueUrl,
        api: api
    });
}).catch( (e) => {
    console.error(e);
});


// api.then(function(conn) {
//   var ok = conn.createChannel();
//   ok = ok.then(function(ch) {
//     return when.all([
//       ch.assertQueue('foo'),
//       ch.assertExchange('bar'),
//       ch.bindQueue('foo', 'bar', 'baz'),
//       ch.consume('foo', handleMessage)
//     ]);
//   });
//   return ok;
// }).then(null, console.warn);
