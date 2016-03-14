// # RabbitMQ example

import { inspect } from 'util';
import { createStore } from 'redux';

// import { loggerReducer } from 'chat-logger';
// import { connect as connectToRabbit} from 'chat-logger';
import { loggerReducer } from '../src/loggerReducer';
import { connect as connectToRabbit} from '../src/amqHelpers';
import { startRelay as startRabbitRelay } from '../src/amqHelpers';

let urls = process.env.AMQ_URL ? process.env.AMQ_URL.split(' ') : [''];
let queueNames = process.env.AMQ_CONSUME_QUEUE ? process.env.AMQ_CONSUME_QUEUE.split(' ') : [''];
let store = createStore(loggerReducer);
store.subscribe(() => {
    console.log(
`
State
=====
${inspect(store.getState())}
`
    );
});

urls.forEach( (url, i) => {
    connectToRabbit(url, store).then( (connection) => {
        console.log('Connected to ', connection.id);
        startRabbitRelay(url, queueNames[i], store);
    }, console.warn);
});
