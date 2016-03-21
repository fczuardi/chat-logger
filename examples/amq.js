// # RabbitMQ example: Listen to a specific queue on the default exchange

import { createStore } from 'redux';

// import { loggerReducer, debugState } from 'chat-logger';
// import { connect as connectToRabbit} from 'chat-logger';
// import { debugState } from 'chat-logger/debug';
// import { connect as connectToRabbit, startRelay as startRabbitRelay } from 'chat-logger/amqHelpers';
import { loggerReducer } from '../src/lib/loggerReducer';
import { debugState } from '../src/lib/debug';
import { connect as connectToRabbit} from '../src/lib/amqHelpers';
import { startRelay as startRabbitRelay } from '../src/lib/amqHelpers';

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
