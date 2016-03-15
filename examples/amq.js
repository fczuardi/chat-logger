// # RabbitMQ example: Listen to a specific queue on the default exchange

import { createStore } from 'redux';

// import { loggerReducer, debugState } from 'chat-logger';
// import { connect as connectToRabbit} from 'chat-logger';
// import { startRelay as startRabbitRelay } from 'chat-logger';
import { loggerReducer } from '../src/loggerReducer';
import { debugState } from '../src/debug';
import { connect as connectToRabbit} from '../src/amqHelpers';
import { startRelay as startRabbitRelay } from '../src/amqHelpers';

let urls = process.env.AMQ_URL ? process.env.AMQ_URL.split(' ') : [''];
let queueNames = process.env.AMQ_DEFAULT_EXCHANGE_CONSUME_QUEUE ?
                    process.env.AMQ_DEFAULT_EXCHANGE_CONSUME_QUEUE.split(' ') :
                    [''];
let store = createStore(loggerReducer);
store.subscribe(() => { debugState(store); });

urls.forEach( (url, i) => {
    connectToRabbit(url, store).then( (connection) => {
        console.log('Connected to ', connection.id);
        startRabbitRelay(url, queueNames[i], store);
    }, console.warn);
});
